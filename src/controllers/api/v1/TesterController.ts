// import { ErrorForbidden } from '../../../exceptions';
// import { ErrorNotFound } from '@src/exceptions';
import { ResultResponse } from '@src/dtos/Result.dto';
import BaseController from '@controllers/BaseController';
import Result from '@src/models/Result';

class TesterController extends BaseController {
	protected action(): ResultResponse {
		const params = this.getParams();

		// Example regular response
		return Result.success(params);
	}
}

export default new TesterController();
