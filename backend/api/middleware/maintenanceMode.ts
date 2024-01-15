import express, { NextFunction } from 'express';
import * as config from '../config';

export const maintenanceMode = (req: express.Request, res: express.Response, next: NextFunction) => {
	const apiStatus = config.apiStatus();
	if (apiStatus.status === "maintenanceMode") {
		res.status(503).send('site down');
	} else {
		next();
	}
}