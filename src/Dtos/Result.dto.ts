class ResultResponse {
	constructor(public result: any, public statusCode: number) {}
}

type ResultErrorParams = {
	payload?: object;
	statusCode?: number;
};

type ResultSuccessParams = {
	statusCode?: number;
};

type ErrorInterface = {
	message: string;
	errors?: Record<string, any>;
};

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
