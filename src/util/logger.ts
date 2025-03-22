import pino from "pino";

const isDev = import.meta.env.MODE === "development";

export const logger = pino({
  enabled: isDev,
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
        },
      }
    : undefined,
});

export const log = (...args: unknown[]) => {
  logger.info(args);
};

export const logWarn = (...args: unknown[]) => {
  logger.warn(args);
};

export const logError = (...args: unknown[]) => {
  logger.error(args);
};

export const logDebug = (...args: unknown[]) => {
  logger.debug(args);
};
