import {Router, type Request, type Response, type NextFunction, type RequestHandler} from 'express';
import BaseController from '@controllers/BaseController';
import {BaseMiddleware, AuthMiddleware, PermissionMiddleware} from '@middlewares';
// import HelperService from '@src/services/Helper.service';
// import Log from '@services/Log.service';
// import { LogDTO } from '@src/dtos';

type DefaultController = ((req: Request, res: Response) => void);
type StandardController = BaseController | DefaultController;

export default class ERouter {
	route: Router;

	constructor() {
		this.route = Router();
	}

	loadMiddleware(guards: string[]): RequestHandler[] {
		const middlewares: BaseMiddleware[] = [
			new AuthMiddleware(),
			new PermissionMiddleware(),
		];
		
		return middlewares.map(middleware => (req: Request, res: Response, next: NextFunction) => {
			if (guards.includes(middleware.name)) {
				middleware.init(req, res);
				middleware.action();
				
				// Log.print(req.query, LogDTO.RUNTIME_LOG_TYPE.WARNING);
			}

			next();
		});
	}

	setRoute(
		path: string,
		method: string,
		controller: StandardController,
		guards: string[],
	): void {
		switch (method) {
			case 'get':
				this.route.get(
					path,
					this.loadMiddleware(guards),
					(req: Request, res: Response, next: NextFunction) => {
						this.runController(controller, method, req, res, next);
					},
				);
				break;
			case 'post':
				this.route.post(
					path,
					this.loadMiddleware(guards),
					(req: Request, res: Response, next: NextFunction) => {
						this.runController(controller, method, req, res, next);
					},
				);
				break;
			case 'put':
				this.route.put(
					path,
					this.loadMiddleware(guards),
					(req: Request, res: Response, next: NextFunction) => {
						this.runController(controller, method, req, res, next);
					},
				);
				break;
			case 'patch':
				this.route.patch(
					path,
					this.loadMiddleware(guards),
					(req: Request, res: Response, next: NextFunction) => {
						this.runController(controller, method, req, res, next);
					},
				);
				break;
			case 'delete':
				this.route.delete(
					path,
					this.loadMiddleware(guards),
					(req: Request, res: Response, next: NextFunction) => {
						this.runController(controller, method, req, res, next);
					},
				);
				break;
			default:
				this.route.use(
					path,
					this.loadMiddleware(guards),
					(req: Request, res: Response, next: NextFunction) => {
						this.runController(controller, method, req, res, next);
					},
				);
				break;
		}
	}

	private runController(
		controller: StandardController, method: string, req: Request, res: Response, next: NextFunction
	) :void {
		if (controller instanceof BaseController) {
			controller.req = req;
			controller.res = res;
			controller.next = next;
			controller.method = method;
			controller.main();
		} else {
			controller(req, res);
			next();
		}
	}
}
