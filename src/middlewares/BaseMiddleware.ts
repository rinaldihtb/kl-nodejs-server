import { Request, Response } from "express";

abstract class BaseMiddleware {
  protected req = {} as Request;
  protected res = {} as Response;

  abstract name: string;
  abstract action(req: Request, res: Response): void;
}

export default BaseMiddleware;
