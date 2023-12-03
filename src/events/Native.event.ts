import { RUNTIME_LOG_TYPE } from '@src/dtos/Log.dto';
import LogService from '@src/services/Log.service';
import type Cluster from 'node:cluster';

class NativeEvent {
	cluster(cluster: typeof Cluster): void {
		cluster.on('online', worker => {
			LogService.print(`Worker ${worker.process.pid} is online`, RUNTIME_LOG_TYPE.NOTICE);
		});

		cluster.on('exit', (worker, code, signal) => {
			LogService.print(`Worker died : ${worker.id} - ${code} - ${signal}`, RUNTIME_LOG_TYPE.NOTICE);
			LogService.print('Restarting a new worker', RUNTIME_LOG_TYPE.NOTICE);
			cluster.fork();
		});

		cluster.on('disconnect', worker => {
			LogService.print(`Worker ${worker.process.pid} is disconnect`, RUNTIME_LOG_TYPE.NOTICE);
		});
	}
}

export default NativeEvent;
