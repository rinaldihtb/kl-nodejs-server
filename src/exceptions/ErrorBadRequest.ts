import BaseError from "./BaseError";

class ErrorBadRequest extends BaseError {
  statusCode;
  constructor(public message: string = "Bad Request") {
    super();
    this.name = "ErrorBadRequest";
    this.statusCode = 400;
  }
}

export default ErrorBadRequest;
