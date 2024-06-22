// import { ErrorForbidden } from '../../../exceptions';
// import { ErrorNotFound } from '@src/exceptions';
import { ResultResponse } from '@src/dtos/Result.dto';
import BaseController from '@controllers/BaseController';
import Result from '@src/models/Result';

class UserListController extends BaseController {
	protected action(): ResultResponse {
		// Example throwing error
		// throw new ErrorForbidden('asd');

		// Example response with error
		// return Result.withError('Could not be proceeded', {payload: {name: 'is invalid'}});

		// Example regular response
		return Result.success('Hello There');
	}
}

export default new UserListController();
