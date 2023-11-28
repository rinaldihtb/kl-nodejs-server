import BaseMiddleware from './BaseMiddleware';

class PermissionMiddleware extends BaseMiddleware {
	public name = 'permission-guard';

	public action(): void {
		console.log(`Check - ${this.name}`);
	}
}

export default new PermissionMiddleware();
