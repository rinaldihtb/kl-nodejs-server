class ResultResponse {
	constructor(public result: string | ErrorInterface, public statusCode: number) {}
}

interface ResultErrorParams {
	payload?: object;
	statusCode?: number;
}

interface ResultSuccessParams {
	statusCode?: number;
}

interface ErrorInterface {
	message: string;
	errors?: object;
}

class ResultWithErrorResponse extends ResultResponse {
	constructor(
		public result: ErrorInterface,
		public statusCode: number,
		public payloads?: object,
	) {
		super(result, statusCode);
	}
}

export {
	type ResultErrorParams,
	type ResultSuccessParams,
	ResultResponse,
	ResultWithErrorResponse,
};
