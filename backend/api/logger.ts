import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
	level: 'debug',
	format: combine(timestamp(), json()),
	transports: [
		new winston.transports.File({
			filename: 'backend/api/logs/api.log',
			level: 'debug'
		})
	]
});