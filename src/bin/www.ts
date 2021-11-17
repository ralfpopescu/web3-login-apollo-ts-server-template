const os = require("os");
const cluster = require("cluster");

const logger = require("../services/logger");
const setup = require("../");

const port = process.env.PORT || 3002;

const startServer = async (onStart = () => {}) => {
  const app = await setup();
  app.listen(port, () => {
    onStart();
  });
};

const clusterWorkerSize = os.cpus().length;
if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i += 1) {
      cluster.fork();
    }

    cluster.on("exit", (worker: any) => {
      logger.debug("Worker", worker.id, " has exitted.");
    });
  } else {
    startServer(() => {
      logger.debug("Express server listening in cluster mode", {
        pid: process.pid,
        port,
      });
    });
  }
} else {
  startServer(() => {
    logger.debug("Express server listening with the single worker", {
      pid: process.pid,
      port,
    });
  });
}
