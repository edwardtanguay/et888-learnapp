/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdCancel, MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
	IFrontendFlashcard,
	convertFrontendFlashcardToFlaschard,
} from "../shared/interfaces";
import { useContext } from "react";
import { AppContext } from "../AppContext";

interface IProps {
	frontendFlashcard: IFrontendFlashcard;
}

export const FlashcardTableMainRow = ({ frontendFlashcard }: IProps) => {
	const { deleteFlashcard, setFrontendFlashcards, frontendFlashcards, toggleRowEditing } =
		useContext(AppContext);

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

	const handleSetFlashcardToDeleting = (
		frontendFlashcard: IFrontendFlashcard
	) => {
		frontendFlashcard.userIsDeleting = !frontendFlashcard.userIsDeleting;
		setFrontendFlashcards(structuredClone(frontendFlashcards));
	};

	return (
		<tr
			className={frontendFlashcard.userIsDeleting ? "deleting" : ""}
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
								handleDeleteFlashcard(frontendFlashcard)
							}
							className="cursor-pointer hover:text-red-900"
						/>
						<MdCancel
							onClick={() =>
								handleSetFlashcardToDeleting(frontendFlashcard)
							}
							className="cursor-pointer hover:text-red-900"
						/>
					</div>
				) : (
					<div className="flex gap-1">
						<MdModeEditOutline
							onClick={() =>
								toggleRowEditing(frontendFlashcard)
							}
							className="cursor-pointer hover:text-green-900"
						/>
						<RiDeleteBin6Line
							onClick={() =>
								handleSetFlashcardToDeleting(frontendFlashcard)
							}
							className="cursor-pointer hover:text-red-900"
						/>
					</div>
				)}
			</td>
		</tr>
	);
};
