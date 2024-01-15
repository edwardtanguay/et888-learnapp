import express from 'express';

export const flashcardPostCleanAndValidate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const errors: string[] = [];

	if (req.body.category === undefined) {
		// data-validation: does the field exist
		errors.push('category field missing')
	} else {
		// data-cleansing: remove spaces front and back
		req.body.category = req.body.category.trim();
		// data-validation: is the field empty
		if (req.body.category === '') {
			errors.push('category field empty')
		}
	}
	if (req.body.front === undefined) {
		errors.push('front field missing')
	} else {
		req.body.front = req.body.front.trim();
		if (req.body.front === '') {
			errors.push('front field empty')
		}
	}

	if (req.body.back === undefined) {
		errors.push('back field missing')
	} else {
		req.body.back = req.body.back.trim();
		if (req.body.back === '') {
			errors.push('back field empty')
		}
	}

	if (errors.length > 0) {
		res.status(400).json({
			message: "invalid fields",
			errors
		});
	} else {
		next();
	}
}