/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IFrontendFlashcard, convertFrontendFlashcardToFlaschard } from "../shared/interfaces";
import { ChangeEvent, useContext } from "react";
import { AppContext } from "../AppContext";

interface IProps {
	frontendFlashcard: IFrontendFlashcard;
}
export const FlashcardTableEditRow = ({ frontendFlashcard }: IProps) => {
	const { toggleRowEditing, frontendFlashcards, setFrontendFlashcards, saveEditFlashcard } =
		useContext(AppContext);

	const handleChangeEditFlashcardField = (
		e: ChangeEvent<HTMLInputElement>,
		field: string,
		frontendFlashcard: IFrontendFlashcard
	) => {
		const value = e.target.value;
		console.log(value);
		switch (field) {
			case "category":
				frontendFlashcard.category = value;
				break;
			case "front":
				frontendFlashcard.front = value;
				break;
			case "back":
				frontendFlashcard.back = value;
				break;
		}
		setFrontendFlashcards(structuredClone(frontendFlashcards));
	};

	const handleSaveEditFlashcard = (frontendFlashcard: IFrontendFlashcard) => {
		(async () => {
			try {
				const flashcard = convertFrontendFlashcardToFlaschard(frontendFlashcard);
				const response = await saveEditFlashcard(flashcard);
				if (response.message === "ok") {
					toggleRowEditing(frontendFlashcard);
				}
			} catch (e: any) {
				console.log(`${e.message}`);
				alert(
					"We're sorry, your flashcard cannot be saved at this time. Try again later, or contact 2342-234-23343."
				);
			}
		})();
	};

	return (
		<tr className="editing">
			<td>{frontendFlashcard.suuid}</td>
			<td>
				<input
					onChange={(e) =>
						handleChangeEditFlashcardField(
							e,
							"category",
							frontendFlashcard
						)
					}
					value={frontendFlashcard.category}
					className="w-full"
					type="text"
				/>
			</td>
			<td>
				<input
					onChange={(e) =>
						handleChangeEditFlashcardField(
							e,
							"front",
							frontendFlashcard
						)
					}
					value={frontendFlashcard.front}
					className="w-full"
					type="text"
				/>
			</td>
			<td>
				<input
					onChange={(e) =>
						handleChangeEditFlashcardField(
							e,
							"back",
							frontendFlashcard
						)
					}
					value={frontendFlashcard.back}
					className="w-full"
					type="text"
				/>
			</td>
			<td>
				<div className="flex gap-1">
					<FaSave
						onClick={() => handleSaveEditFlashcard(frontendFlashcard)}
						className="cursor-pointer hover:text-green-900"
					/>
					<MdCancel
						onClick={() => toggleRowEditing(frontendFlashcard)}
						className="cursor-pointer hover:text-red-900"
					/>
				</div>
			</td>
		</tr>
	);
};
