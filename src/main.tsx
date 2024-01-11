import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import "./index.scss";
import { PageWelcome } from "./pages/PageWelcome.tsx";
import { PageAbout } from "./pages/PageAbout.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { AppProvider } from "./AppContext.tsx";
import { PageManageFlashcards } from "./pages/PageManageFlashcards.tsx";
import { ISiteEnvironment } from "./shared/interfaces.ts";
import { PageFlashcards } from "./pages/PageFlashcards.tsx";

const siteEnvironment: ISiteEnvironment = import.meta.env.VITE_ENV;

let children = [
	{
		path: "welcome",
		element: <PageWelcome />,
	},
	{
		path: "manage-flashcards",
		element: <PageManageFlashcards />,
	},
	{
		path: "flashcards",
		element: <PageFlashcards />,
	},
	{
		path: "about",
		element: <PageAbout />,
	},
	{
		path: "/",
		element: <Navigate to="/welcome" replace />,
	},
];

if (siteEnvironment === "production") {
	children = children.filter((m) => !["manage-flashcards"].includes(m.path));
}

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);
