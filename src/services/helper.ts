import { Response } from "express";
import { ResultResponse } from "../Dtos/Result.dto";

export class Helper {
  public response(res: Response, response: ResultResponse): void {
    if (["string", "number"].includes(typeof response.result)) {
      res.header("content-type", "text/html");
    } else if (typeof response.result === "object") {
      res.header("content-type", "application/json");
    }

    res.statusCode = response.statusCode;
    res.send(response.result);
  }
}
