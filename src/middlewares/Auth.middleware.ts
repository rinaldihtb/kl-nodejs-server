import BaseMiddleware from './BaseMiddleware';

class AuthMiddleware extends BaseMiddleware {
	public name = 'auth-guard';

	public action(): void {
		// Action Here
	}
}

export default AuthMiddleware;
