import { FeedTorrent, PrismaTorrentPayload } from '../../types.js';

export const sanitize = (torrent: FeedTorrent): PrismaTorrentPayload => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { eta, download, upload, seeds, peers, ...sanitized } = torrent;
  return torrent;
};

export const sanitizePartial = (
  torrent: Partial<FeedTorrent>,
): Partial<PrismaTorrentPayload> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { eta, download, upload, seeds, peers, ...sanitized } = torrent;
  return torrent;
};
