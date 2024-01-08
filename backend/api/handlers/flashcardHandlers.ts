import { getDb } from './dbtools';

const db = await getDb();

export const getAllFlashcards = () => {
	return db.data.flashcards;
}