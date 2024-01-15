/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction } from 'express';
import { flashcardRouter } from './routers/flashcardRouter';
import cors from 'cors';
import { maintenanceMode } from './middleware/maintenanceMode';
import { logger, morganRouteLogger } from './logger';

export const app = express();
app.use(express.json());
app.use(cors());
app.use(maintenanceMode);
app.use(morganRouteLogger);

app.get('/', (req, res) => {
	res.json({
		appName: "API for AppLearn version 0.1"
	})
});

app.use('/api/flashcards', flashcardRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
	console.error(err.message)
	logger.error(err.message);
	res.status(500).send('We are currently experiencing technical difficulties. Try again at a later time, or call 423 23423 23 234.')
});