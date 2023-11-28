import BaseMiddleware from './BaseMiddleware';

class AuthMiddleware extends BaseMiddleware {
	public name = 'auth-guard';

	public action(): void {
		console.log(`Check - ${this.name}`);
	}
}

export default new AuthMiddleware();
