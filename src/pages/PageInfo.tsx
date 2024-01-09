import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageInfo = () => {
	const { flashcards } = useContext(AppContext);
	return (
		<p>This is the info page with {flashcards.length} flashcards</p>
	)
}
