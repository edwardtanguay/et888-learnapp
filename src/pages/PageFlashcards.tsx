import { useState } from "react";
import db from "../../backend/data/db.json";
import { Flashcard } from "../components/Flashcard";
import { ITestingFlashcard, convertFlashcardToTestingFlaschard } from "../shared/interfaces";

const _flashcards = db.flashcards;
const _testingFlashcards: ITestingFlashcard[] = [];
for (const _flashcard of _flashcards) {
	const _testingFlashcard: ITestingFlashcard = convertFlashcardToTestingFlaschard(_flashcard);
	_testingFlashcards.push(_testingFlashcard);
}

export const PageFlashcards = () => {
	const [testingFlashcards, setTestingFlashcards] = useState<ITestingFlashcard[]>(_testingFlashcards)
	return (
		<>
			<p>There are {testingFlashcards.length} flashcards:</p>
			<div className="mt-4">
				{testingFlashcards.map((testingFlashcard) => {
					return <Flashcard testingFlashcard={testingFlashcard} key={testingFlashcard.suuid} setTestingFlashcards={setTestingFlashcards} testingFlashcards={testingFlashcards} />;
				})}
			</div>
		</>
	);
};
