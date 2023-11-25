import App from './src/app';
import cluster from 'node:cluster';
import os from 'node:os';
import 'dotenv/config';
import {NativeEvent} from './src/exceptions';

if (cluster.isPrimary && process.env.ENABLE_WORKERTHREAD === 'true') {
	os.cpus().forEach(() => cluster.fork());
	const nativeEvent = new NativeEvent();
	nativeEvent.cluster(cluster);
} else {
	const app = new App();
	app.start();
}
