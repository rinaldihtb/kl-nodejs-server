import {type Request, type Response} from 'express';
import HelloController from '../controllers/api/v1/HelloController';
import ERouter from '../models/ERouter';
import {ResultResponse} from '../dtos/Result.dto';
import Result from '../models/Result';

const eRouter = new ERouter();

// Define routes
eRouter.setRoute('/abc', 'get', HelloController, [
	'auth-guard',
	'permission-guard',
]);
eRouter.setRoute(
	'*',
	'get',
	(req: Request, res: Response) => {
		const resultResponse = new ResultResponse('halo', 202);
		Result.response(res, resultResponse);
	},
	['auth-guard', 'permission-guard'],
);

export default eRouter.route;
