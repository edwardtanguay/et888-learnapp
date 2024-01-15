import express from 'express';
import { suuidIsValid } from '../handlers/dbtools';

export const flashcardSuuidValidate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const errors: string[] = [];

	const suuid = req.params.suuid;

	if (!suuidIsValid(suuid)) {
		errors.push('suuid must be exactly 6 characters and contain only upper and lowercase letter or numbers, special characters are not allowed');
	}

	if (errors.length > 0) {
		res.status(400).json({
			message: "invalid suuid",
			errors
		})
	} else {
		next();
	}
}