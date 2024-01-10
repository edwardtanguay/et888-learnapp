/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { MdModeEditOutline, MdCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiOneplus } from "react-icons/si";
import { FaSave } from "react-icons/fa";
import {
	IFrontendFlashcard,
	INewFlashcard,
	blankNewFlashcard,
	convertFrontendFlashcardToFlaschard,
} from "../shared/interfaces";

export const PageManageFlashcards = () => {
	const {
		frontendFlashcards,
		setFrontendFlashcards,
		saveAddFlashcard,
		deleteFlashcard,
	} = useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
	const [newFlashcard, setNewFlashcard] = useState<INewFlashcard>(
		structuredClone(blankNewFlashcard)
	);

	const handleChangeNewFlashcardField = (
		e: ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		const value = e.target.value;
		switch (field) {
			case "category":
				newFlashcard.category = value;
				break;
			case "front":
				newFlashcard.front = value;
				break;
			case "back":
				newFlashcard.back = value;
				break;
		}
		const _newFlashcard = structuredClone(newFlashcard);
		setNewFlashcard(_newFlashcard);
	};

	const handleCancelAddFlashcard = () => {
		setIsAddingFlashcard(false);
		setNewFlashcard(structuredClone(blankNewFlashcard));
	};

	const handleSaveAddFlashcard = () => {
		(async () => {
			try {
				const response = await saveAddFlashcard(newFlashcard);
				if (response.message === "ok") {
					handleCancelAddFlashcard();
				}
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
					<thead>
						<tr>
							<th>SUUID</th>
							<th>Category</th>
							<th>Front</th>
							<th>Back</th>
							<th>
								<div className="flex justify-center text-[#222] text-2xl">
									<SiOneplus
										onClick={() =>
											setIsAddingFlashcard(
												!isAddingFlashcard
											)
										}
										className="cursor-pointer hover:text-green-900"
									/>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{isAddingFlashcard && (
							<tr>
								<td></td>
								<td>
									<input
										value={newFlashcard.category}
										onChange={(e) =>
											handleChangeNewFlashcardField(
												e,
												"category"
											)
										}
										className="w-full"
									/>
								</td>
								<td>
									<input
										value={newFlashcard.front}
										onChange={(e) =>
											handleChangeNewFlashcardField(
												e,
												"front"
											)
										}
										className="w-full"
									/>
								</td>
								<td>
									<input
										value={newFlashcard.back}
										onChange={(e) =>
											handleChangeNewFlashcardField(
												e,
												"back"
											)
										}
										className="w-full"
									/>
								</td>
								<td>
									<div className="flex gap-1">
										<FaSave
											onClick={handleSaveAddFlashcard}
											className="cursor-pointer hover:text-green-900"
										/>
										<MdCancel
											onClick={handleCancelAddFlashcard}
											className="cursor-pointer hover:text-red-900"
										/>
									</div>
								</td>
							</tr>
						)}
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
												onClick = {() => handleDeleteFlashcard(frontendFlashcard)}
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
