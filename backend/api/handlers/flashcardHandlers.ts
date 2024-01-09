import { IFlashcard, INewFlashcard, IPatchFlashcard } from '../../../src/shared/interfaces';
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
	const flashcard: IFlashcard = {
		suuid: getSuuid(),
		...newFlashcard,
	}
	db.data.flashcards.push(flashcard);
	await db.write();
	return flashcard;
}

export const replaceFlashcard = async (replacementFlashcard: IFlashcard) => {
	const formerFlashcard = db.data.flashcards.find(m => m.suuid === replacementFlashcard.suuid);
	if (formerFlashcard) {
		formerFlashcard.category = replacementFlashcard.category;
		formerFlashcard.front = replacementFlashcard.front;
		formerFlashcard.back = replacementFlashcard.back;
		await db.write();
		return formerFlashcard;
	} else {
		return null;
	}
}

export const replaceSomeFieldsInFlashcard = async (suuid: string, patchFlashcard: IPatchFlashcard) => {
	const formerFlashcard = db.data.flashcards.find(m => m.suuid === suuid);
	if (formerFlashcard) {
		if (patchFlashcard.category) formerFlashcard.category = patchFlashcard.category;
		if (patchFlashcard.front) formerFlashcard.front = patchFlashcard.front;
		if (patchFlashcard.back) formerFlashcard.back = patchFlashcard.back;
		await db.write();
		return formerFlashcard;
	} else {
		return null;
	}
}

export const deleteFlashcard = async (suuid: string) => {
	const flashcard = db.data.flashcards.find(m => m.suuid === suuid);
	const indexToRemove = db.data.flashcards.findIndex(item => item.suuid === suuid);
	if (indexToRemove !== -1) {
		db.data.flashcards.splice(indexToRemove, 1);
	}

	if (flashcard) {
		await db.write();
		return flashcard;
	} else {
		return null;
	}
}
