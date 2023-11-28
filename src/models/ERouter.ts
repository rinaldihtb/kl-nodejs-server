import {Router, type Request, type Response, type NextFunction, type RequestHandler} from 'express';
import BaseController from '../controllers/BaseController';
import AuthMiddleware from '../middlewares/Auth.middleware';
import PermissionMiddleware from '../middlewares/Permission.middleware';
import BaseMiddleware from '../middlewares/BaseMiddleware';

type DefaultController = ((req: Request, res: Response) => void);

export default class ERouter {
	route: Router;

	constructor() {
		this.route = Router();
	}

	loadMiddleware(guards: string[]): RequestHandler[] {
		const middlewares: BaseMiddleware[] = [
			AuthMiddleware,
			PermissionMiddleware,
		];

		return middlewares.map(middleware => (req: Request, res: Response, next: NextFunction) => {
			if (guards.includes(middleware.name)) {
				middleware.init(req, res);
				middleware.action();
			}

			next();
		});
	}

	setRoute<Controller extends BaseController>(
		path: string,
		method: string,
		controller: Controller | DefaultController,
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
