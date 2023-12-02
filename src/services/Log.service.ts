import chalk, { ChalkFunction } from 'chalk';
import Helper from './Helper.service';
import { LogDTO } from '@src/dtos';

class Log{
	private static instance : Log;

	private constructor() {}

	public static getInstance() : Log {
		if(!Log.instance) {
			Log.instance = new Log();
		}

		return Log.instance;
	}

	private log = console.log;

	public print(msg: unknown, type : LogDTO.RUNTIME_LOG_TYPE) : void {
		let cF : ChalkFunction = chalk.reset;
		switch (type) {
			case LogDTO.RUNTIME_LOG_TYPE.NOTICE:
				cF = chalk.cyan;
				break;
			case LogDTO.RUNTIME_LOG_TYPE.ERROR:
				cF = chalk.bold.red;
				break;
			case LogDTO.RUNTIME_LOG_TYPE.WARNING:
				cF = chalk.keyword('orange');
				break;
			default:
				break;
		}

		this.execute(msg, cF, type);
	}

	private execute(msg: unknown, c: ChalkFunction, type: LogDTO.RUNTIME_LOG_TYPE) :void {
		if(process.env.RUNTIME_LOG_ENABLE === 'true') {
			this.log(`[${c(type)}|${chalk.blackBright(Helper.getLoggingDate())}]:`, (typeof msg === 'object') ? c(require('util').inspect(msg, {colors:true, depth:null})): c(msg));
		}
	}
}

export default Log.getInstance();