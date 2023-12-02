import { type Response, type Request } from 'express';
import Result from '@models/Result';
import { LogDTO, ResultDTO } from '@dtos';
import { BaseError, ErrorBadRequest } from '@exceptions';
import LogService from '@src/services/Log.service';

abstract class BaseController {
	private readonly _ctx: unknown;
	private _req: Request;
	private _res: Response;
	private _method: string;

	public set req (request: Request) {
		this._req = request;
	}

	public set res (response: Response) {
		this._res = response;
	}

	public set method (method: string) {
		this._method = method;
	}

	constructor () {
		this._ctx = null;
		this._req = {} as Request;
		this._res = {} as Response;
		this._method = 'all';
	}

	protected abstract action (): ResultDTO.ResultResponse;
  
	main () {
		try {
			LogService.print(this._req.body, LogDTO.RUNTIME_LOG_TYPE.NOTICE);
			this.wrapActions();
			const result = this.action();

			//Logging Start
			this.response(result);
		} catch (error) {
			if (error instanceof BaseError) {
				this.response(
					Result.withError(error.message, { statusCode: error.statusCode })
				);
			} else {
				this.response(Result.withError('Not Found', { statusCode: 404, payload: {hello: 'world'} }));
			}

			LogService.print(error, LogDTO.RUNTIME_LOG_TYPE.ERROR);
		}
	}

	private wrapActions () {
		// Check methods
		if (this._req.method.toLowerCase() !== this._method) {
			throw new ErrorBadRequest('Bad Request');
		}
	}

	private response (response: ResultDTO.ResultResponse) {
		this._res.statusCode = response.statusCode;
		if (['string', 'number'].includes(typeof response.result)) {
			this._res.send(response.result);
		} else if (typeof response.result === 'object') {
			this._res.json(response.result).end();
		}
	}
}

export default BaseController;
