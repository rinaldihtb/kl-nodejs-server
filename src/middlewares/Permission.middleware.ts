import {type Response, type Request} from 'express';
import BaseMiddleware from './BaseMiddleware';

class PermissionMiddleware extends BaseMiddleware {
	public name = 'permission-guard';

	public action(req: Request, res: Response): void {
		this.req = req;
		this.res = res;

		console.log(`Check - ${this.name}`);
	}
}

export default new PermissionMiddleware();
