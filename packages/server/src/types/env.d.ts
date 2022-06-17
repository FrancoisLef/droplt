declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      SERVER_PORT: string;
      JOB_FEED_INTERVAL: string;
      JOB_CLEAN_INTERVAL: string;
      TRANSMISSION_URL: string;
      TRANSMISSION_USER: string;
      TRANSMISSION_PASSWORD: string;
    }
  }
}

export {};
