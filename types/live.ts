export type LiveStatus = {
  isLive: boolean;
  viewerCount?: number;
  streamUrl?: string;
  embedUrl?: string;
};

export type TwitchLiveBatch = Record<string, LiveStatus>;
export type YouTubeLiveBatch = Record<string, LiveStatus>;

export type LiveBatchResponse = {
  twitch: TwitchLiveBatch;
  youtube: YouTubeLiveBatch;
};
