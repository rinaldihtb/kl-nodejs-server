// import { ErrorForbidden } from '../../../exceptions';
import { ResultResponse } from '../../../dtos/Result.dto';
import Result from '../../../models/Result';
import BaseController from '../../BaseController';

class HelloController extends BaseController {
	protected action(): ResultResponse {
		// Example throwing error
		// throw new ErrorForbidden('asd');

		// Example response with error
		// return Result.withError('Could not be proceeded', {payload: {name: 'is invalid'}});

		// Example regular response
		return Result.success('Hello There');
	}
}

export default new HelloController();
