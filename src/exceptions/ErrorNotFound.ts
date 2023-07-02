import BaseError from "./BaseError";

class ErrorNotFound extends BaseError {
  statusCode;
  constructor(public message: string = "Bad Request") {
    super();
    this.name = "ErrorNotFound";
    this.statusCode = 404;
  }
}

export default ErrorNotFound;
