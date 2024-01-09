import { Router } from 'express';
import * as flashcardHandlers from '../handlers/flashcardHandlers';
import { IFlashcard, INewFlashcard, IPatchFlashcard } from '../../../src/shared/interfaces';

export const flashcardRouter = Router();

flashcardRouter.get('/', (_req, res) => {
	const flashcards = flashcardHandlers.getAllFlashcards();
	res.json(flashcards);
});

flashcardRouter.get('/:suuid', (req, res) => {
	const suuid = req.params.suuid;
	const flashcard = flashcardHandlers.getOneFlashcard(suuid);
	if (flashcard) {
		res.json(flashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
});

flashcardRouter.post('/', async (req, res) => {
	const newFlashcard: INewFlashcard = req.body;
	const flashcard = await flashcardHandlers.addFlashcard(newFlashcard);
	res.status(201).json(flashcard);
});

flashcardRouter.put('/', async (req, res) => {
	const flashcard: IFlashcard = req.body;
	const replacedFlashcard = await flashcardHandlers.replaceFlashcard(flashcard);
	if (replacedFlashcard) {
		res.json(replacedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${flashcard.suuid}" not found.`)
	}
});

flashcardRouter.patch('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const patchFlashcard: IPatchFlashcard = req.body;
	const replacedFlashcard = await flashcardHandlers.replaceSomeFieldsInFlashcard(suuid, patchFlashcard);
	if (replacedFlashcard) {
		res.json(replacedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
});

flashcardRouter.delete('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const deletedFlashcard = await flashcardHandlers.deleteFlashcard(suuid);
	if (deletedFlashcard) {
		res.json(deletedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
})