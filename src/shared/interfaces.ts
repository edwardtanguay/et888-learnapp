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
