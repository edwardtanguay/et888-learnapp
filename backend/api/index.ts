import * as config from './config';
import { app } from './server';

app.listen(config.getPort(), () => {
	console.log(`http://localhost:${config.getPort()}`);
})