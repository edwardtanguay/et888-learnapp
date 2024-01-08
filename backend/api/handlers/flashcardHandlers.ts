import { join } from 'path';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { IDatabase } from '../../interfaces';

const projectBasePath = process.cwd();
const dbPathAndFileName = join(projectBasePath, 'backend/data/db.json');
const adapter = new JSONFile<IDatabase>(dbPathAndFileName);
const db: Low<IDatabase> = new Low<IDatabase>(adapter, {} as IDatabase);
await db.read();

export const getAllFlashcards = () => {
	return db.data.flashcards;
}