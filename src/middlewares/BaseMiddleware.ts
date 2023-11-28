import {type Request, type Response} from 'express';

abstract class BaseMiddleware {
	protected req: Request | unknown;
	protected res: Response | unknown;

	abstract name: string;
	abstract action():void;
	public init(req: Request, res: Response): void {
		this.req = req;
		this.res = res;
	}
}

export default BaseMiddleware;
