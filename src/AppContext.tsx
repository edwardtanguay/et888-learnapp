/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import {
	IFlashcard,
	IFrontendFlashcard,
	INewFlashcard,
	IPromiseResolution,
	ISiteEnvironment,
	convertFlashcardToFrontendFlaschard,
} from "./shared/interfaces";
import axios from "axios";

interface IAppContext {
	frontendFlashcards: IFrontendFlashcard[];
	setFrontendFlashcards: (frontendFlashcards: IFrontendFlashcard[]) => void;
	saveAddFlashcard: (
		newFlashcard: INewFlashcard
	) => Promise<IPromiseResolution>;
	deleteFlashcard: (flashcard: IFlashcard) => Promise<IPromiseResolution>;
	toggleRowEditing: (frontendFlashcard: IFrontendFlashcard) => void;
	saveEditFlashcard: (flashcard: IFlashcard) => Promise<IPromiseResolution>;
	siteEnvironment: ISiteEnvironment;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = "http://localhost:4206";
const siteEnvironment:ISiteEnvironment = import.meta.env.VITE_ENV;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [frontendFlashcards, setFrontendFlashcards] = useState<
		IFrontendFlashcard[]
	>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/api/flashcards`);
			const _flashcards = response.data;
			const _frontendFlashcards = [];
			for (const _flashcard of _flashcards) {
				const _frontendFlashcard: IFrontendFlashcard =
					convertFlashcardToFrontendFlaschard(_flashcard);
				_frontendFlashcards.push(_frontendFlashcard);
			}
			setFrontendFlashcards(_frontendFlashcards);
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
						const frontendFlashcard =
							convertFlashcardToFrontendFlaschard(flashcard);
						frontendFlashcards.unshift(frontendFlashcard);
						setFrontendFlashcards(
							structuredClone(frontendFlashcards)
						);
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

	const saveEditFlashcard = async (flashcard: IFlashcard) => {
		return new Promise<IPromiseResolution>((resolve, reject) => {
			const headers = {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			};
			(async () => {
				try {
					const response = await axios.put(
						`${backendUrl}/api/flashcards`,
						flashcard,
						{ headers }
					);
					if (response.status === 200) {
						// const flashcard: IFlashcard = response.data;
						// const frontendFlashcard =
						// 	convertFlashcardToFrontendFlaschard(flashcard);
						// TODO: save data from backend flashcard
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

	const deleteFlashcard = (flashcard: IFlashcard) => {
		return new Promise<IPromiseResolution>((resolve, reject) => {
			(async () => {
				try {
					const response = await axios.delete(
						`${backendUrl}/api/flashcards/${flashcard.suuid}`
					);
					if (response.status === 200) {
						const _frontendFlashcards = frontendFlashcards.filter(
							(m) => m.suuid !== flashcard.suuid
						);
						setFrontendFlashcards(_frontendFlashcards);
						resolve({ message: "ok" });
					} else {
						reject({
							message: `ERROR: status code ${response.status}`,
						});
					}
				} catch (e: any) {
					reject({
						message: `ERROR: ${
							e.message + " / " + e.response.data
						}`,
					});
				}
			})();
		});
	};
	
	const toggleRowEditing = (frontendFlashcard: IFrontendFlashcard) => {
		frontendFlashcard.userIsEditing = !frontendFlashcard.userIsEditing;
		setFrontendFlashcards(structuredClone(frontendFlashcards));
	};

	return (
		<AppContext.Provider
			value={{
				frontendFlashcards,
				setFrontendFlashcards,
				saveAddFlashcard,
				deleteFlashcard,
				toggleRowEditing,
				saveEditFlashcard,
				siteEnvironment
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
