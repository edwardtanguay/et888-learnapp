import { join } from 'path';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { IDatabase } from '../../interfaces';

export const getDb = async () => {
	const projectBasePath = process.cwd();
	const dbPathAndFileName = join(projectBasePath, 'backend/data/db.json');
	const adapter = new JSONFile<IDatabase>(dbPathAndFileName);
	const db: Low<IDatabase> = new Low<IDatabase>(adapter, {} as IDatabase);
	await db.read();
	return db;
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