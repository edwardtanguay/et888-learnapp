import { ChangeEvent, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { MdModeEditOutline, MdCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiOneplus } from "react-icons/si";
import { FaSave } from "react-icons/fa";
import { INewFlashcard, blankNewFlashcard } from "../shared/interfaces";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
	const [newFlashcard, setNewFlashcard] =
		useState<INewFlashcard>(blankNewFlashcard);

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

	return (
		<>
			<p>There are {flashcards.length} flashcards:</p>

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
										<FaSave className="cursor-pointer hover:text-green-900" />
										<MdCancel className="cursor-pointer hover:text-red-900" />
									</div>
								</td>
							</tr>
						)}
						{flashcards.map((flashcard) => {
							return (
								<tr key={flashcard.suuid}>
									<td>{flashcard.suuid}</td>
									<td>{flashcard.category}</td>
									<td>{flashcard.front}</td>
									<td>{flashcard.back}</td>
									<td>
										<div className="flex gap-1">
											<MdModeEditOutline className="cursor-pointer hover:text-green-900" />
											<RiDeleteBin6Line className="cursor-pointer hover:text-red-900" />
										</div>
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
