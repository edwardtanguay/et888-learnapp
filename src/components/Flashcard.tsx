import { IFlashcard } from "../shared/interfaces"

interface IProps {
	flashcard: IFlashcard;
}

export const Flashcard = ({ flashcard }: IProps) => {
	return (
		<div className="mb-4 w-[40rem]">
			<div className="bg-slate-500 p-4 rounded-t-lg">{flashcard.front}</div>
			<div className="bg-slate-300 p-4 rounded-b-lg">{flashcard.back}</div>
		</div>
	)
}