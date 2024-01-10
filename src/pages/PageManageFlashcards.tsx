/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { FlashcardTableHead } from "../components/FlashcardTableHead";
import { FlashcardTableAddRow } from "../components/FlashcardTableAddRow";
import { FlashcardTableMainRow } from "../components/FlashcardTableMainRow";
import { FlashcardTableEditRow } from "../components/FlashcardTableEditRow";
import React from "react";

export const PageManageFlashcards = () => {
	const { frontendFlashcards } = useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);

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
						{isAddingFlashcard && (
							<FlashcardTableAddRow
								setIsAddingFlashcard={setIsAddingFlashcard}
							/>
						)}
						{frontendFlashcards.map((frontendFlashcard) => {
							return (
								<React.Fragment key={frontendFlashcard.suuid}>
									{frontendFlashcard.userIsEditing ? (
										<FlashcardTableEditRow
											frontendFlashcard={
												frontendFlashcard
											}
										/>
									) : (
										<FlashcardTableMainRow
											frontendFlashcard={
												frontendFlashcard
											}
										/>
									)}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</form>
		</>
	);
};
