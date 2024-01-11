import db from "../../backend/data/db.json";
import { Flashcard } from "../components/Flashcard";

const flashcards = db.flashcards;

export const PageFlashcards = () => {
	return (
		<>
			<p>There are {flashcards.length} flashcards:</p>
			<div className="mt-4">
				{flashcards.map((flashcard) => {
					return <Flashcard flashcard={flashcard} />;
				})}
			</div>
		</>
	);
};
