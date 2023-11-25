import BaseError from './BaseError';

class ErrorForbidden extends BaseError {
	statusCode;
	constructor(public message = 'Forbidden') {
		super();
		this.name = 'ErrorForbidden';
		this.statusCode = 403;
	}
}

export default ErrorForbidden;
