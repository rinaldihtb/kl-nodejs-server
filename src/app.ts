import express from 'express';
import router from '@routes';
import bodyParser from 'body-parser';
import LogService from './services/Log.service';
import { RUNTIME_LOG_TYPE } from './dtos/Log.dto';

export default class App {
	public instance;
	private readonly port = process.env.PORT || 9000;

	constructor() {
		this.instance = express();
	}

	loadMiddlewares(): void {
		this.instance.use(bodyParser.urlencoded({ extended: false }));
		this.instance.use(bodyParser.json());
		this.instance.use(router);
	}

	init(): void {
		this.loadMiddlewares();
		// This.loadConfiguration();
		// this.loadDatabase();
	}

	start() {
		this.init();
		this.instance.listen(this.port, () => {
			LogService.print(
				`Instance has been started on port ${this.port} on process ${process.pid}. ${process.env.HOST}:${this.port}`,
				RUNTIME_LOG_TYPE.NOTICE
			);
		});
	}
}
