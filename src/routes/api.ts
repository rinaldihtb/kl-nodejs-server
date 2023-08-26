import { Request, Response } from "express";
import HelloController from "../controllers/api/v1/HelloController";
import ERouter from "../models/ERouter";

const eRouter = new ERouter();

// define routes
eRouter.setRoute("/abc", "get", HelloController, [
  "auth-guard",
  "permission-guard"
]);
eRouter.setRoute(
  "*",
  "get",
  (req: Request, res: Response) => {
    res.send("ERROR");
  },
  ["auth-guard", "permission-guard"]
);

export default eRouter.route;
