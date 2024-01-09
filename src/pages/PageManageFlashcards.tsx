import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	return (
		<>
		<p>There are {flashcards.length} flashcards:</p>

		<table>
				<thead>
					<tr>
						<th>SUUID</th>
						<th>Category</th>
						<th>Front</th>
						<th>Back</th>
					</tr>
				</thead>
				<tbody>
					{flashcards.map(flashcard => {
						return (
							<tr>
								<td>nnn</td>
								<td>nnn</td>
								<td>nnn</td>
								<td>nnn</td>
							</tr>
						)
					})}
				</tbody>
		</table>
		</>
	)
}
