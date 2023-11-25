import {type ResultResponse} from '../../../dtos/Result.dto';
// Import { ErrorForbidden } from "../../../exceptions";
import Result from '../../../models/Result';
import BaseController from '../../BaseController';

class HelloController extends BaseController {
	protected action(): ResultResponse {
		// Example throwing error
		// throw new ErrorForbidden();
		return Result.success('Hello There');
	}
}

export default new HelloController();
