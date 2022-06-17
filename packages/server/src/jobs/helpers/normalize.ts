import { Torrent as TransmissionTorrent } from '@ctrl/transmission';

import { FeedTorrent } from '../../types';
import { statusMap } from './status-map';

export const normalize = (torrent: TransmissionTorrent): FeedTorrent => {
  const addedAt = new Date(torrent.addedDate * 1000);
  const completedAt = torrent.doneDate
    ? new Date(torrent.doneDate * 1000)
    : null;

  const result: FeedTorrent = {
    torrentId: torrent.hashString,
    name: torrent.name,
    size: torrent.totalSize,
    path: torrent.downloadDir,
    progress: torrent.percentDone,
    ratio: torrent.uploadRatio,
    status: statusMap(torrent.status),
    eta: torrent.eta,
    downloaded: torrent.downloadedEver,
    uploaded: torrent.uploadedEver,
    addedAt,
    completedAt,
  };
  return result;
};
