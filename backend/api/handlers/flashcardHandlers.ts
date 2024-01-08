import { IFlashcard, INewFlashcard } from '../../interfaces';
import { getDb, getSuuid } from './dbtools';

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

export const addFlashcard = async (newFlashcard: INewFlashcard) => {
	const flashcard:IFlashcard = {
		suuid: getSuuid(),
		...newFlashcard,
	}
	await db.write();
	console.log(222, 'just wrote');
	return flashcard;
}