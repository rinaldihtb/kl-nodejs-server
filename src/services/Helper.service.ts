import { ResultDTO } from '@src/dtos';
import {type Request, type Response} from 'express';

class Helper {
	private static instance : Helper;

	private constructor() {}
    
	public static getInstance() : Helper{
		if(!Helper.instance) {
			Helper.instance = new Helper();
		}

		return Helper.instance;
	}

	public getCurrentDate() {
		const currentDate = new Date();
		return currentDate;
	}
	
	// METHODS
	public getLoggingDate() : string{
		const currentDate = this.getCurrentDate();
		const dateFormatted = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth()}-${currentDate.getUTCDate()} ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}:${currentDate.getUTCSeconds()}`;

		return dateFormatted;
	}

	public getSummaryRequest(req: Request) : object {
		const summary : object = {
			'authority' : req.headers.host,
			'method' : req.method,
			'path' : req.originalUrl,
			'scheme' : req.protocol,
			'headers' : req.headers,
			'params': req.params,
			'query': req.query,
			'body': req.body
		};
		return summary;
	}
	
	public getSummaryResponse(res: Response, resultResponse: ResultDTO.ResultResponse) : object {
		const summary : object = {
			'headers' : res.getHeaders(),
			'statusCode': res.statusCode,
			'response': resultResponse,
		};
		return summary;
	}
}

export default Helper.getInstance();
