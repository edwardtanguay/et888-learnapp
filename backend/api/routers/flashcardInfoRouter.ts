import { Router } from 'express';

export const flashcardInfoRouter = Router();

flashcardInfoRouter.get('/logs', (req, res) => {
	res.send('the log report')
})