// import { ErrorForbidden } from '../../../exceptions';
import { ErrorNotFound } from '@src/exceptions';
import { ResultResponse } from '@src/dtos/Result.dto';
import BaseController from '@controllers/BaseController';

class ErrorController extends BaseController {
	protected action(): ResultResponse {
		throw new ErrorNotFound('Not Found');
	}
}

export default new ErrorController();
