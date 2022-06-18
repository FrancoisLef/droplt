-- CreateTable
CREATE TABLE "Torrent" (
    "torrentId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "path" TEXT NOT NULL,
    "eta" REAL,
    "progress" REAL NOT NULL DEFAULT 0,
    "ratio" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "downloaded" REAL NOT NULL DEFAULT 0,
    "uploaded" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "addedAt" DATETIME NOT NULL,
    "completedAt" DATETIME
);

-- CreateTable
CREATE TABLE "TorrentFile" (
    "torrentFileId" TEXT NOT NULL PRIMARY KEY,
    "torrentId" TEXT,
    "name" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "downloaded" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TorrentFile_torrentId_fkey" FOREIGN KEY ("torrentId") REFERENCES "Torrent" ("torrentId") ON DELETE SET NULL ON UPDATE CASCADE
);
