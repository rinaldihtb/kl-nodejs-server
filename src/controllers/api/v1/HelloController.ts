import { ResultResponse } from "../../../Dtos/Result.dto";
import Result from "../../../models/Result";
import BaseController from "../../BaseController";

class MainController extends BaseController {
  protected action(): ResultResponse {
    const result = {
      hi: "there"
    };
    return Result.success(result, { statusCode: 500 });
  }
}

export default new MainController();
