export interface IFlashcard {
	suuid: string;
	category: string;
	front: string
	back: string;
}

export interface IDatabase {
	flashcards: IFlashcard[];
}
