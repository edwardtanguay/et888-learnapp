import { createContext, useEffect, useState } from "react";
import { IFlashcard, INewFlashcard } from "./shared/interfaces";
import axios from "axios";

interface IAppContext {
	flashcards: IFlashcard[];
	saveAddFlashcard: (newFlashcard: INewFlashcard) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = "http://localhost:4206";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/api/flashcards`);
			const _flashcards = response.data;
			setFlashcards(_flashcards);
		})();
	}, []);

	const saveAddFlashcard = (newFlashcard: INewFlashcard) => {
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		};
		(async () => {
			await axios.post(
				`${backendUrl}/api/flashcards`,
				newFlashcard, { headers }
			);
		})();
	};

	return (
		<AppContext.Provider
			value={{
				flashcards,
				saveAddFlashcard,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
