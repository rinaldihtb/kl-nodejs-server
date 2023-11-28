import { type Response as Res, type Request as Req } from 'express';
import Result from '../models/Result';
import { type ResultResponse } from '../dtos/Result.dto';
import { BaseError } from '../exceptions';

abstract class BaseController {
	private readonly _ctx: unknown;
	private _req: Req;
	private _res: Res;
	private _method: string;

	public set req (request: Req) {
		this._req = request;
	}

	public set res (response: Res) {
		this._res = response;
	}

	public set method (method: string) {
		this._method = method;
	}

	constructor () {
		this._ctx = null;
		this._req = {} as Req;
		this._res = {} as Res;
		this._method = 'all';
	}

	protected abstract action (): ResultResponse
  
	main () {
		try {
			this.wrapActions();
			const result = this.action();

			this.response(result);
		} catch (error) {
			if (error instanceof BaseError) {
				// logging errors
				error.log();
				this.response(
					Result.withError(error.message, { statusCode: error.statusCode })
				);
			} else {
				this.response(Result.withError('Not Found', { statusCode: 404, payload: {hello: 'world'} }));
			}
		}
	}

	private wrapActions () {
		// Check methods
		if (this._req.method.toLowerCase() !== this._method) {
			this.response(Result.withError('Bad Request'));
			throw new Error('Bad Request');
		}
	}

	private response (response: ResultResponse) {
		if (['string', 'number'].includes(typeof response.result)) {
			this._res.header('content-type', 'text/html');
		} else if (typeof response.result === 'object') {
			this._res.header('content-type', 'application/json');
		}

		this._res.statusCode = response.statusCode;
		this._res.send(response.result);
	}
}

export default BaseController;
