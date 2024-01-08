import { Router } from 'express';
import * as flashcardHandlers from '../handlers/flashcardHandlers';

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

flashcardRouter.post('/', (req, res) => {
	const newFlashcard = req.body;
	flashcardHandlers.addFlashcard(newFlashcard);
	res.json('testing...');
});

flashcardRouter.put('/:suuid', (req, res) => {
	const suuid = req.params.suuid;
	res.json(`replace all fields flashcard with suuid ${suuid}`);
});

flashcardRouter.patch('/:suuid', (req, res) => {
	const suuid = req.params.suuid;
	res.json(`replace some fields on flashcard with suuid ${suuid}`);
});

flashcardRouter.delete('/:suuid', (req, res) => {
	const suuid = req.params.suuid;
	res.json(`delete flashcard with suuid ${suuid}`);
})