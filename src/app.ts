import express from "express";
import router from "./routes";

export default class App {
  public instance;
  private port = process.env.PORT || 9000;

  constructor() {
    this.instance = express();
  }

  loadMiddlewares() {
    this.instance.use(router);
  }

  init() {
    this.loadMiddlewares();
    // this.loadConfiguration();
    // this.loadDatabase();
  }

  start() {
    this.init();
    this.instance.listen(this.port, () => {
      console.log(
        `Instance has been started on port ${this.port} on process ${process.pid}. ${process.env.HOST}:${this.port}`
      );
    });
  }
}
