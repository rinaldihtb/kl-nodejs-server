import App from "./src/app";
import cluster from "node:cluster";
import os from "node:os";
import NativeEvent from "./src/exceptions/NativeEvent";
import "dotenv/config";

if (cluster.isPrimary && process.env.ENABLE_WORKERTHREAD === "true") {
  os.cpus().forEach(() => cluster.fork());
  NativeEvent.cluster(cluster);
} else {
  const app = new App();
  app.start();
}
