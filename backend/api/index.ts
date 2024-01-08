import express from 'express';
import * as config from './config';

const app = express();

app.get('/', (req, res) => {
	res.json({
		appName: "API for AppLearn version 0.1"
	})
});

app.listen(config.getPort(), () => {
	console.log(`http://localhost:${config.getPort()}`);
});