export interface INewFlashcard {
	category: string;
	front: string
	back: string;
}


export const blankNewFlashcard: INewFlashcard = {
	category: 'linux',
	front: '',
	back: ''
}

export interface IFlashcard extends INewFlashcard {
	suuid: string;
}

export interface ITestingFlashcard extends IFlashcard {
	backIsShowing: boolean;
}

export interface IFrontendFlashcard extends IFlashcard {
	userIsDeleting: boolean;
	userIsEditing: boolean;
}

export interface IPatchFlashcard {
	category?: string;
	front?: string
	back?: string;
}

export interface IDatabase {
	flashcards: IFlashcard[];
}

export interface IPromiseResolution {
	message: string;
}

export const convertFlashcardToFrontendFlaschard = (flashcard: IFlashcard): IFrontendFlashcard => {
	return {
		...flashcard,
		userIsDeleting: false,
		userIsEditing: false
	}
}

export const convertFrontendFlashcardToFlaschard = (frontendFlashcard: IFrontendFlashcard): IFlashcard => {
    return {
        suuid: frontendFlashcard.suuid,
        category: frontendFlashcard.category,
        front: frontendFlashcard.front,
        back: frontendFlashcard.back
    }
}

export type ISiteEnvironment = "development" | "production";

export const convertFlashcardToTestingFlaschard = (flashcard: IFlashcard): ITestingFlashcard => {
	return {
		...flashcard,
		backIsShowing: false
	}
}