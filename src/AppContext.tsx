/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import {
	IFlashcard,
	INewFlashcard,
	IPromiseResolution,
} from "./shared/interfaces";
import axios from "axios";

interface IAppContext {
	flashcards: IFlashcard[];
	saveAddFlashcard: (
		newFlashcard: INewFlashcard
	) => Promise<IPromiseResolution>;
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

	const saveAddFlashcard = async (newFlashcard: INewFlashcard) => {
		return new Promise<IPromiseResolution>((resolve, reject) => {
			const headers = {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			};
			(async () => {
				try {
					const response = await axios.post(
						`${backendUrl}/api/flashcards`,
						newFlashcard,
						{ headers }
					);
					if (response.status === 201) {
						const flashcard: IFlashcard = response.data;
						flashcards.push(flashcard);
						const _flashcards = structuredClone(flashcards);
						setFlashcards(_flashcards);
						resolve({ message: "ok" });
					} else {
						reject({
							message: `ERROR: status code ${response.status}`,
						});
					}
				} catch (e: any) {
					reject({
						message: `ERROR: ${e.message}`,
					});
				}
			})();
		});
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
