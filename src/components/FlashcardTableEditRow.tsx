import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IFrontendFlashcard } from "../shared/interfaces";
import { useContext } from "react";
import { AppContext } from "../AppContext";

interface IProps {
	frontendFlashcard: IFrontendFlashcard;
}
export const FlashcardTableEditRow = ({ frontendFlashcard }: IProps) => {
	const { toggleRowEditing } = useContext(AppContext);

	return (
		<tr className="editing">
			<td>{frontendFlashcard.suuid}</td>
			<td>
				<input className="w-full" type="text" />
			</td>
			<td>
				<input className="w-full" type="text" />
			</td>
			<td>
				<input className="w-full" type="text" />
			</td>
			<td>
				<FaSave
					// onClick={handleSaveAddFlashcard}
					className="cursor-pointer hover:text-green-900"
				/>
				<MdCancel
					onClick={() => toggleRowEditing(frontendFlashcard)}
					className="cursor-pointer hover:text-red-900"
				/>
			</td>
		</tr>
	);
};
