import { type Response, type Request, NextFunction } from 'express';
import Result from '@models/Result';
import { LogDTO, ResultDTO } from '@dtos';
import { BaseError } from '@exceptions';
import LogService from '@src/services/Log.service';
import HelperService from '@src/services/Helper.service';

abstract class BaseController {
	private readonly _ctx: unknown;
	private _req: Request;
	private _res: Response;
	private _next: NextFunction;
	private _method: string;

	public set req (request: Request) {
		this._req = request;
	}

	public set res (response: Response) {
		this._res = response;
	}
	
	public set next (next: NextFunction) {
		this._next = next;
	}

	public set method (method: string) {
		this._method = method;
	}

	constructor () {
		this._ctx = null;
		this._req = {} as Request;
		this._res = {} as Response;
		this._next = {} as NextFunction;
		this._method = 'all';
	}

	protected abstract action (): ResultDTO.ResultResponse;
  
	main () {
		try {
			//Logging Start
			LogService.print(['Request', HelperService.getSummaryRequest(this._req)], LogDTO.RUNTIME_LOG_TYPE.NOTICE);

			//Perform neccessary action
			this.wrapActions();

			//Execute controller action
			const result = this.action();

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
		// if (this._req.method.toLowerCase() !== this._method) {
		// 	throw new ErrorBadRequest('Bad Request');
		// 	// this._next();
		// }
	}

	private response (response: ResultDTO.ResultResponse) {
		this._res.statusCode = response.statusCode;
		if (['string', 'number'].includes(typeof response.result)) {
			this._res.send(response.result);
		} else if (typeof response.result === 'object') {
			this._res.json(response.result).end();
		}

		LogService.print(['Response', HelperService.getSummaryResponse(this._res, response)], LogDTO.RUNTIME_LOG_TYPE.NOTICE);
	}
}

export default BaseController;
