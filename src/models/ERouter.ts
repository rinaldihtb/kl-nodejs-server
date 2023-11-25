import {Router, type Request, type Response, type NextFunction} from 'express';
import BaseController from '../controllers/BaseController';
import type BaseMiddleware from '../middlewares/BaseMiddleware';
import AuthMiddleware from '../middlewares/Auth.middleware';
import PermissionMiddleware from '../middlewares/Permission.middleware';

export default class ERouter {
	route: Router;

	constructor() {
		this.route = Router();
	}

	loadMiddleware(guards: string[]): any[] {
		const middlewares: BaseMiddleware[] = [
			AuthMiddleware,
			PermissionMiddleware,
		];

		return middlewares.map(middleware => (req: Request, res: Response, next: NextFunction) => {
			if (guards.includes(middleware.name)) {
				middleware.action(req, res);
			}

			next();
		});
	}

	setRoute(
		path: string,
		method: string,
		controller: BaseController | any,
		guards: string[],
	): void {
		this.route.use(
			path,
			this.loadMiddleware(guards),
			(req: Request, res: Response) => {
				if (controller instanceof BaseController) {
					controller.req = req;
					controller.res = res;
					controller.method = method;
					controller.main();
				} else {
					controller(req, res);
					res.end();
				}
			},
		);
	}
}
