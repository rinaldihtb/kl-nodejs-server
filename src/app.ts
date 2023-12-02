import express from 'express';
import router from '@routes';
import bodyParser from 'body-parser';

export default class App {
	public instance;
	private readonly port = process.env.PORT || 9000;

	constructor() {
		this.instance = express();
	}

	loadMiddlewares(): void {
		this.instance.use(bodyParser.urlencoded({extended:false}));
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
			console.log(
				`Instance has been started on port ${this.port} on process ${process.pid}. ${process.env.HOST}:${this.port}`,
			);
		});
	}
}
