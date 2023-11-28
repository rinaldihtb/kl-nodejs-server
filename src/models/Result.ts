import {
	type ResultResponse,
	type ResultSuccessParams,
	type ResultErrorParams,
	type ResultWithErrorResponse,
} from '../dtos/Result.dto';
import {type Response} from 'express';

class Result {
	constructor() {}

	withError(
		message: string,
		params?: ResultErrorParams,
	): ResultWithErrorResponse {
		return {
			result: {
				message,
				errors: params?.payload,
			},
			statusCode: params?.statusCode ?? 400,
		};
	}

	success(
		result: string,
		params?: ResultSuccessParams,
	): ResultResponse {
		return {
			result,
			statusCode: params?.statusCode ?? 200,
		};
	}

	public response(res: Response, response: ResultResponse): void {
		if (['string', 'number'].includes(typeof response.result)) {
			res.header('content-type', 'text/html');
		} else if (typeof response.result === 'object') {
			res.header('content-type', 'application/json');
		}

		res.statusCode = response.statusCode;
		res.send(response.result);
	}
}

export default new Result();
