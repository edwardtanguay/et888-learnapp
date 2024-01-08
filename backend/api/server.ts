import express from 'express';

export const app = express();

app.get('/', (req, res) => {
	res.json({
		appName: "API for AppLearn version 0.1"
	})
});