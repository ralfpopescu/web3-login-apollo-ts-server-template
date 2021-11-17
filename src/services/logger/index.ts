const debug = (message: string, metadata: object) => {
  console.log(message, JSON.stringify(metadata));
};

const error = (message: string, metadata: object, e?: Error) => {
  console.log(message);
  console.log(JSON.stringify(metadata));
  console.log(e);
};

export type Logger = { debug: typeof debug, error: typeof error }

export const logger = { debug, error }
