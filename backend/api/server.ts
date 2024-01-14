import express from 'express';
import { flashcardRouter } from './routers/flashcardRouters';
import cors from 'cors';

export const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json({
		appName: "API for AppLearn version 0.1"
	})
});

app.use('/api/flashcards', flashcardRouter);