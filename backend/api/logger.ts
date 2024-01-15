import morgan from 'morgan';
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

export const morganRouteLogger = morgan(
	(tokens, req, res) => {
		return JSON.stringify({
			method: tokens.method(req, res),
			url: tokens.url(req, res),
			status: tokens.status(req, res),
			contentLength: String(tokens.res(req, res, 'content-length')),
			responseTime: tokens['response-time'](req, res),
			remoteAddr: String(req.socket.remoteAddress)
		});
	},
	{
		stream: {
			write: (message) => {
				const data = JSON.parse(message);
				logger.http(`incoming-request`, data);
			},
		},
	}
);