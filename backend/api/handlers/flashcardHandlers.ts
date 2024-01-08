import { getDb } from './dbtools';

const db = await getDb();

export const getAllFlashcards = () => {
	return db.data.flashcards;
}

export const getOneFlashcard = (suuid: string) => {
	const flashcard = db.data.flashcards.find(m => m.suuid === suuid);

	if (flashcard) {
		return flashcard;
	} else {
		return null;
	}
}