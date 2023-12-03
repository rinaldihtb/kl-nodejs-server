// import {type Request, type Response} from 'express';
import HelloController from '@controllers/api/v1/HelloController';
import ERouter from '@models/ERouter';
// import Result from '@models/Result';
// import { ResultDTO } from '@dtos';
import ErrorController from '@src/controllers/api/v1/ErrorController';
import TesterController from '@src/controllers/api/v1/TesterController';

const eRouter = new ERouter();

// Define routes
eRouter.setRoute('/abc', 'get', HelloController, [
	'auth-guard',
	'permission-guard',
]);
eRouter.setRoute('/abc/:id', 'get', TesterController, [
	'auth-guard',
	'permission-guard',
]);
eRouter.setRoute('/abc', 'post', HelloController, [
	'auth-guard',
	'permission-guard',
]);
// eRouter.setRoute(
// 	'*',
// 	'get',
// 	(req: Request, res: Response) => {
// 		const resultResponse = new ResultDTO.ResultResponse('halo', 202);
// 		Result.response(res, resultResponse);
// 	},
// 	['auth-guard', 'permission-guard'],
// );
eRouter.setRoute(
	'*',
	'all',
	ErrorController,
	[],
);

export default eRouter.route;
