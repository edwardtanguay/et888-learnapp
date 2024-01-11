import { ITestingFlashcard } from "../shared/interfaces";

interface IProps {
	testingFlashcard: ITestingFlashcard;
}

export const Flashcard = ({ testingFlashcard }: IProps) => {
	return (
		<div className="mb-4 w-[40rem]">
			<div className="bg-slate-500 p-4 rounded-t-lg">
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
