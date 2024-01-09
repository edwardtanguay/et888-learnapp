import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	return (
		<p>There are {flashcards.length} flashcards:</p>
	)
}
