/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { MdModeEditOutline, MdCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
	IFrontendFlashcard,
	convertFrontendFlashcardToFlaschard,
} from "../shared/interfaces";
import { FlashcardTableHead } from "../components/FlashcardTableHead";
import { FlashcardTableAddRow } from "../components/FlashcardTableAddRow";

export const PageManageFlashcards = () => {
	const {
		frontendFlashcards,
		setFrontendFlashcards,
		deleteFlashcard,
	} = useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);

	const handleSetFlashcardToDeleting = (
		frontendFlashcard: IFrontendFlashcard
	) => {
		frontendFlashcard.userIsDeleting = !frontendFlashcard.userIsDeleting;
		setFrontendFlashcards(structuredClone(frontendFlashcards));
	};

	const handleDeleteFlashcard = (frontendFlashcard: IFrontendFlashcard) => {
		(async () => {
			try {
				const flashcard =
					convertFrontendFlashcardToFlaschard(frontendFlashcard);
				await deleteFlashcard(flashcard);
			} catch (e: any) {
				console.log(`${e.message}`);
				alert(
					"We're sorry, your flashcard cannot be saved at this time. Try again later, or contact 2342-234-23343."
				);
			}
		})();
	};

	return (
		<>
			<p>There are {frontendFlashcards.length} flashcards:</p>

			<form>
				<table className="dataTable mt-4 w-[60rem]">
					<FlashcardTableHead
						setIsAddingFlashcard={setIsAddingFlashcard}
						isAddingFlashcard={isAddingFlashcard}
					/>
					<tbody>
						{isAddingFlashcard && <FlashcardTableAddRow setIsAddingFlashcard={setIsAddingFlashcard} />}
						{frontendFlashcards.map((frontendFlashcard) => {
							return (
								<tr
									className={
										frontendFlashcard.userIsDeleting
											? "deleting"
											: ""
									}
									key={frontendFlashcard.suuid}
								>
									<td>{frontendFlashcard.suuid}</td>
									<td>{frontendFlashcard.category}</td>
									<td>{frontendFlashcard.front}</td>
									<td>{frontendFlashcard.back}</td>
									<td>
										{frontendFlashcard.userIsDeleting ? (
											<div className="flex gap-1">
												<RiDeleteBin6Line
													onClick={() =>
														handleDeleteFlashcard(
															frontendFlashcard
														)
													}
													className="cursor-pointer hover:text-red-900"
												/>
												<MdCancel
													onClick={() =>
														handleSetFlashcardToDeleting(
															frontendFlashcard
														)
													}
													className="cursor-pointer hover:text-red-900"
												/>
											</div>
										) : (
											<div className="flex gap-1">
												<MdModeEditOutline className="cursor-pointer hover:text-green-900" />
												<RiDeleteBin6Line
													onClick={() =>
														handleSetFlashcardToDeleting(
															frontendFlashcard
														)
													}
													className="cursor-pointer hover:text-red-900"
												/>
											</div>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</form>
		</>
	);
};
