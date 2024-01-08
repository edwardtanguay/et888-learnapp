import express from 'express';
import { flashcardRouter } from './routers/flashcardrouter';

export const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		appName: "API for AppLearn version 0.1"
	})
});

app.use('/api/flashcards', flashcardRouter);