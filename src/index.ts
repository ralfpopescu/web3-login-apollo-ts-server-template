import {getApp} from "./services/get-app";
import {setupServer} from "./services/setup-server";

export const setup = async () => {
  console.log("Setting up server...");
  const app = getApp();
  const server = await setupServer();
  server.keepAliveTimeout = 61 * 1000;
  server.headersTimeout = 65 * 1000;

  server.applyMiddleware({app});

  return app;
};
