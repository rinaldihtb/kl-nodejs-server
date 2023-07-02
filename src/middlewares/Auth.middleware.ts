import { Response, Request } from "express";
import BaseMiddleware from "./BaseMiddleware";

class AuthMiddleware extends BaseMiddleware {
  public name = "auth-guard";

  public action(req: Request, res: Response): void {
    this.req = req;
    this.res = res;

    console.log(`Check - ${this.name}`);
  }
}

export default new AuthMiddleware();
