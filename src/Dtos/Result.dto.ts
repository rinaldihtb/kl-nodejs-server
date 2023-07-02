class ResultResponse {
  constructor(public result: any, public statusCode: number) {}
}

interface ResultErrorParams {
  payload?: any;
  statusCode?: number;
}

interface ResultSuccessParams {
  statusCode?: number;
}

interface ErrorInterface {
  message: string;
  errors?: object;
}

class ResultWithErrorResponse extends ResultResponse {
  constructor(
    public result: ErrorInterface,
    public statusCode: number,
    public payloads?: any
  ) {
    super(result, statusCode);
  }
}

export {
  ResultErrorParams,
  ResultSuccessParams,
  ResultResponse,
  ResultWithErrorResponse
};
