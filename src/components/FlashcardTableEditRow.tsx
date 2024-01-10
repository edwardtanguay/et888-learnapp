import { IFrontendFlashcard } from "../shared/interfaces";

interface IProps {
	frontendFlashcard: IFrontendFlashcard;
}

export const FlashcardTableEditRow = ({ frontendFlashcard }: IProps) => {
	return (
	<tr className="editing">
			<td>{frontendFlashcard.suuid}</td>
		<td><input className="w-full" type="text" /></td>
		<td><input className="w-full" type="text" /></td>
		<td><input className="w-full" type="text" /></td>
		<td>edit</td>
	</tr>
	)
}