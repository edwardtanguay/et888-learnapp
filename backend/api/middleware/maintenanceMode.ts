import express, { NextFunction } from 'express';

export const maintenanceMode = (req:express.Request, res:express.Response, next:NextFunction) => {
	console.log('in maintenance mode middleware');
	next();
}