import { Torrent as TransmissionTorrent } from '@ctrl/transmission';
import { prisma } from '@droplt/prisma';
import deepEqual from 'deep-equal';
import { AsyncTask } from 'toad-scheduler';

import transmission from '../services/transmission';
import {
  CreatesFeed,
  DiffFeed,
  FeedTorrent,
  RawFeed,
  UpdatesFeed,
} from '../types';
import { normalize, sanitize, sanitizePartial } from './helpers';

class FeederJob {
  private currFeed: RawFeed = {};

  public async run(): Promise<void> {
    console.log('coucou');
    // fetch data from provider
    const listTorrents = await transmission.listTorrents();

    console.log(listTorrents);

    // // build next feed
    // const nextFeed = this.formatFeed(listTorrents.arguments.torrents);

    // // compute differences between current and next feeds
    // const { creates, deletes, updates } = this.feedsDiff(nextFeed);

    // // create newly detected torrents
    // await this.handleCreates(creates);

    // // update already detected torrents
    // await this.handleUpdates(updates);

    // // delete torrents
    // await this.handleDeletes(deletes);

    // this.currFeed = nextFeed;
  }

  public onError(error: Error): void {
    if (error.name === 'TimeoutError') {
      return;
    }
    console.log('Oops', error);
  }

  private feedsDiff(nextFeed: RawFeed): DiffFeed {
    const { currFeed } = this;

    const creates: CreatesFeed = {};

    const updates = Object.keys(nextFeed).reduce((acc, torrentId) => {
      const currFeedItem = currFeed[torrentId];
      const nextFeedItem = nextFeed[torrentId];

      // torrentId doesn't exists: it's a brand new item
      if (typeof currFeedItem === 'undefined') {
        creates[torrentId] = nextFeedItem;
        return acc;
      }

      // torrentId exists: compute props differences
      Object.keys(nextFeedItem).forEach((propKey) => {
        // if one of the prop is inequal, we need to add it to the diff
        if (!deepEqual(currFeedItem[propKey], nextFeedItem[propKey])) {
          // initialize torrentId diff when this is the first known inequal prop
          if (typeof acc[torrentId] === 'undefined') {
            acc[torrentId] = {};
          }
          // add prop to diff
          acc[torrentId][propKey] = nextFeedItem[propKey];
        }
      });

      return acc;
    }, {} as UpdatesFeed);

    const deletes = this.detectDeletes(nextFeed, Object.keys(creates).length);

    return {
      creates,
      updates,
      deletes,
    };
  }

  private async handleCreates(creates: CreatesFeed) {
    const transactions = Object.keys(creates).map((torrentId) => {
      const torrent = sanitize(creates[torrentId] as unknown as FeedTorrent);
      return prisma.torrent.upsert({
        where: {
          torrentId,
        },
        update: torrent,
        create: torrent,
      });
    });

    return prisma.$transaction(transactions);
  }

  private async handleUpdates(updates: UpdatesFeed) {
    const transactions = Object.keys(updates).map((torrentId) => {
      const torrent = sanitizePartial(
        updates[torrentId] as unknown as Partial<FeedTorrent>,
      );
      return prisma.torrent.update({
        where: {
          torrentId,
        },
        data: torrent,
      });
    });

    return prisma.$transaction(transactions);
  }

  private async handleDeletes(deletes: string[]) {
    const transactions = deletes.map((torrentId) => {
      return prisma.torrent.delete({
        where: {
          torrentId,
        },
      });
    });

    return prisma.$transaction(transactions);
  }

  private detectDeletes(nextFeed: RawFeed, newItemCount: number): string[] {
    // we need to look for deleted items in two scenarios:
    // 1. the next feed length is less than the current feed length
    // 2. at least one new item was added and the next feed length is
    //    equal to or greater than the current feed length
    //
    // we definitely don't need to look for deleted items if the number
    // of new items is equal to the difference between next feed list
    // length and previous feed list length
    const nextFeedLength = Object.keys(nextFeed).length;
    const currFeedLength = Object.keys(this.currFeed).length;

    // check if the next feed has less items than the current feed
    let shouldLook = nextFeedLength < currFeedLength;

    if (newItemCount > 0) {
      if (nextFeedLength >= currFeedLength) {
        shouldLook = true;
      }
      if (newItemCount === nextFeedLength - currFeedLength) {
        shouldLook = false;
      }
    }

    if (!shouldLook) {
      return [];
    }

    return Object.keys(this.currFeed).filter(
      (hash) => typeof nextFeed[hash] === 'undefined',
    );
  }

  private formatFeed(torrents: TransmissionTorrent[]): RawFeed {
    return torrents.map(normalize).reduce(
      (acc, torrent) => ({
        ...acc,
        [torrent.torrentId]: torrent,
      }),
      {},
    );
  }
}

const feederJob = new FeederJob();

export default new AsyncTask('feed', () => feederJob.run(), feederJob.onError);
