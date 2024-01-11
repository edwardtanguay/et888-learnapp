import { ITestingFlashcard } from "../shared/interfaces";

interface IProps {
	testingFlashcard: ITestingFlashcard;
	setTestingFlashcards: (testingFlashcards: ITestingFlashcard[]) => void;
	testingFlashcards: ITestingFlashcard[];
}

export const Flashcard = ({
	testingFlashcard,
	setTestingFlashcards,
	testingFlashcards,
}: IProps) => {
	const handleToggleFlashcard = (testingFlashcard: ITestingFlashcard) => {
		testingFlashcard.backIsShowing = !testingFlashcard.backIsShowing;
		setTestingFlashcards(structuredClone(testingFlashcards));
	};

	return (
		<div className="mb-4 w-[40rem]">
			<div
				onClick={() => handleToggleFlashcard(testingFlashcard)}
				className="bg-slate-500 p-4 rounded-t-lg cursor-pointer"
			>
				{testingFlashcard.front}
			</div>
			{testingFlashcard.backIsShowing && (
				<div className="bg-slate-300 p-4 rounded-b-lg">
					{testingFlashcard.back}
				</div>
			)}
		</div>
	);
};
