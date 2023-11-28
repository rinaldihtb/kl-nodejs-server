import App from './src/app';
import cluster from 'node:cluster';
import os from 'node:os';
import 'dotenv/config';
import {NativeEvent} from './src/exceptions';

if (cluster.isPrimary && process.env.ENABLE_WORKERTHREAD === 'true') {
	if(process.env.NUM_OF_WORKERTHREAD !== undefined && Number(process.env.NUM_OF_WORKERTHREAD)) {
		const cpus = new Array(parseInt(process.env.NUM_OF_WORKERTHREAD)).fill(0);
		cpus.forEach(() => cluster.fork());
	} else {
		os.cpus().forEach(() => cluster.fork());
	}
	const nativeEvent = new NativeEvent();
	nativeEvent.cluster(cluster);
} else {
	const app = new App();
	app.start();
}
