import Cluster from "node:cluster";

class NativeEvent {
  cluster(cluster: typeof Cluster): void {
    cluster.on("online", (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker died : ${worker.id} - ${code} - ${signal}`);
      console.log("Restarting a new worker");
      cluster.fork();
    });

    cluster.on("disconnect", (worker) => {
      console.log(`Worker ${worker.process.pid} is disconnect`);
    });
  }
}

export default new NativeEvent();
