import BaseMiddleware from './BaseMiddleware';

class PermissionMiddleware extends BaseMiddleware {
	public name = 'permission-guard';

	public action(): void {
		// Action Here
	}
}

export default PermissionMiddleware;
