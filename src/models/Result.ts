import {
  ResultResponse,
  ResultSuccessParams,
  ResultErrorParams,
  ResultWithErrorResponse
} from "../Dtos/Result.dto";

class Result {
  withError(
    message: string,
    params?: ResultErrorParams
  ): ResultWithErrorResponse {
    return {
      result: {
        message: message,
        errors: params?.payload
      },
      statusCode: params?.statusCode ?? 400
    };
  }

  success(
    result: object | string,
    params?: ResultSuccessParams
  ): ResultResponse {
    return {
      result: result,
      statusCode: params?.statusCode ?? 200
    };
  }
}

export default new Result();
