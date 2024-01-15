import { join } from 'path';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { IDatabase, ILogItem } from '../../../src/shared/interfaces';
import fs from 'fs';

export const getDb = async () => {
	try {
		const projectBasePath = process.cwd();
		const dbPathAndFileName = join(projectBasePath, 'backend/data/db.json');
		const adapter = new JSONFile<IDatabase>(dbPathAndFileName);
		const db: Low<IDatabase> = new Low<IDatabase>(adapter, {} as IDatabase);
		await db.read();
		if (Object.keys(db.data).length === 0) {
			return null;
		} else {
			return db;
		}
	}
	catch (e) {
		return null;
	}
}

export const getSuuid = () => {
	const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const length = 6;
	let suuid = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		suuid += characters.charAt(randomIndex);
	}

	return suuid;
}

export const suuidIsValid = (text: string) => {
	const suuidRegex = /^[a-zA-Z0-9]{6}$/;
	return suuidRegex.test(text);
}

export async function getArrayOfLogObjects(): Promise<ILogItem[]> {
	try {
		const logFilePathAndFileName = join(process.cwd(), 'backend/api/logs/api.log');
		const data = await fs.promises.readFile(logFilePathAndFileName, 'utf8');
		const logEntries = data.split('\n').filter(entry => entry.trim() !== '');
		const _logs: ILogItem[] = logEntries.map(log => JSON.parse(log));
		const logs: ILogItem[] = [];
		for (const _log of _logs) {
			if (_log.url !== '/favicon.ico') {
				const log = structuredClone(_log);
				log.method = log.method === undefined ? '' : log.method;
				log.remoteAddr = log.remoteAddr === undefined ? '' : log.remoteAddr;
				log.responseTime = log.responseTime === undefined ? '' : log.responseTime;
				log.status = log.status === undefined ? '' : log.status;
				log.url = log.url === undefined ? '' : log.url;
				logs.push(log);
			}
		}
		logs.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
		return logs;
	} catch (err) {
		console.error(err);
		return [];
	}
}

export const getLogTextColorByLevel = (level: string) => {
	if (level === 'debug') {
		return '#ccc';
	} else {
		return '#000;'
	}
}
export const getLogBackgroundColorByLevel = (level: string) => {
	switch (level) {
		case 'info':
			return '#aaa';
		case 'verbose':
			return '#ccc';
		case 'warn':
			return 'gold';
		case 'http':
			return 'lightgreen';
		case 'error':
			return 'red';
		case 'debug':
			return '#333';
		default:
			return '#fff';
	}
}