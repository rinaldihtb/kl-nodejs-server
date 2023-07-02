import { ResultResponse } from "../../../Dtos/Result.dto";
import Result from "../../../models/Result";
import BaseController from "../../BaseController";

class HelloController extends BaseController {
  protected action(): ResultResponse {
    return Result.success("Hello There");
  }
}

export default new HelloController();
