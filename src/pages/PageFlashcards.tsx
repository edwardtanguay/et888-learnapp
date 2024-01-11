import db from '../../backend/data/db.json';

const flashcards = db.flashcards;

export const PageFlashcards = () => {

	return (
		<p>There are {flashcards.length} flashcards:</p>
	)
}
