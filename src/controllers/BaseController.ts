import { Response as Res, Request as Req } from "express";
import Result from "../models/Result";
import { ResultResponse } from "../Dtos/Result.dto";

abstract class BaseController {
  private _ctx: any;
  private _req: Req;
  private _res: Res;
  private _method: string;

  public set req(request: Req) {
    this._req = request;
  }

  public set res(response: Res) {
    this._res = response;
  }

  public set method(method: string) {
    this._method = method;
  }
  constructor() {
    this._ctx = null;
    this._req = {} as Req;
    this._res = {} as Res;
    this._method = "all";
  }

  protected abstract action(): ResultResponse;

  main() {
    try {
      this.wrapActions();
      const result = this.action();
      
      this.response(result);
    } catch (error) {
      console.error(error);
      this.response(this.action());
    }
  }

  private wrapActions() {
    //Check methods
    if (this._req.method.toLowerCase() !== this._method) {
      this.response(Result.withError("Bad Request"));
      throw new Error("Bad Request");
    }
  }

  private response(result: ResultResponse) {
    if (typeof result === "string") {
      this._res.header("content-type", "text/html");
    } else if (typeof result === "object") {
      this._res.header("content-type", "application/json");
    }

    this._res.statusCode = result.statusCode;
    this._res.send(result.result);
  }
}

export default BaseController;
