import express from 'express';

export const flashcardSuuidValidate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const errors: string[] = [];

	const suuid = req.params.suuid;
	if (suuid.length !== 6) {
		errors.push('suuid must be 6 characters');
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