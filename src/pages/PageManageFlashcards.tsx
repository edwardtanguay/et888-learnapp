import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { MdModeEditOutline, MdCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiOneplus } from "react-icons/si";
import { FaSave } from "react-icons/fa";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(true);
	return (
		<>
			<p>There are {flashcards.length} flashcards:</p>

			<table className="dataTable mt-4">
				<thead>
					<tr>
						<th>SUUID</th>
						<th>Category</th>
						<th>Front</th>
						<th>Back</th>
						<th>
							<div className="flex justify-center text-[#222] text-2xl">
								<SiOneplus className="cursor-pointer hover:text-green-900" />
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{isAddingFlashcard && (
					<tr>
						<td></td>
						<td>
							<input className="w-full" />
						</td>
						<td>
							<input className="w-full" />
						</td>
						<td>
							<input className="w-full" />
						</td>
						<td>
							<div className="flex gap-1">
								<FaSave  className="cursor-pointer hover:text-green-900"/>
								<MdCancel  className="cursor-pointer hover:text-red-900"/>
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
		</>
	);
};
