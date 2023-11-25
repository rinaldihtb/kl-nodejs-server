import {type Request, type Response} from 'express';

abstract class BaseMiddleware {
	protected req: Request | unknown;
	protected res: Response | unknown;

	abstract name: string;
	abstract action(req: Request, res: Response): void;
}

export default BaseMiddleware;
