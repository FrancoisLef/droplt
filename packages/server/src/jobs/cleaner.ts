import { AsyncTask } from 'toad-scheduler';

import prisma from '../services/prisma.js';
import transmission from '../services/transmission.js';
import { normalize } from './helpers/index.js';

class CleanerJob {
  public async run(): Promise<void> {
    // fetch data from provider
    const listTorrents = await transmission.listTorrents();

    // count torrents from database
    const dbTorrentsCount = await prisma.torrent.count();

    // count torrents from provider
    const btTorrentsCount = listTorrents.arguments.torrents.length;

    if (btTorrentsCount === dbTorrentsCount) {
      return;
    }

    // get torrents id from database
    const dbTorrents = await prisma.torrent.findMany({
      select: {
        torrentId: true,
      },
    });

    // get torrents id from provider
    const btTorrentsIds = listTorrents.arguments.torrents.map(
      (torrent) => normalize(torrent).torrentId,
    );

    // find differences
    const toDelete = dbTorrents
      .filter((torrent) => !btTorrentsIds.includes(torrent.torrentId))
      .map((torrent) => torrent.torrentId);

    if (toDelete.length === 0) {
      return;
    }

    console.log(`Deleted ${toDelete.length}`);

    // delete from database
    const transactions = toDelete.map((torrentId) => {
      return prisma.torrent.delete({
        where: {
          torrentId,
        },
      });
    });

    await prisma.$transaction(transactions);
  }

  public onError(error: Error): void {
    if (error.name === 'TimeoutError') {
      return;
    }
    console.log('Oops', error);
  }
}

const cleanerJob = new CleanerJob();

export default new AsyncTask(
  'clean',
  () => cleanerJob.run(),
  cleanerJob.onError,
);
