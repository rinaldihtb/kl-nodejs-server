// import { ErrorForbidden } from '../../../exceptions';
import { ErrorBadRequest } from '@src/exceptions';
import { ResultResponse } from '../../../dtos/Result.dto';
import BaseController from '../../BaseController';

class ErrorController extends BaseController {
	protected action(): ResultResponse {
		throw new ErrorBadRequest('Bad Request');
	}
}

export default new ErrorController();
