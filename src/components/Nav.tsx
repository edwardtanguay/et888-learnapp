import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";

export const Nav = () => {
	const { siteEnvironment } = useContext(AppContext);

	return (
		<nav>
			<ul className="flex gap-4 bg-slate-500 px-4 py-2 content">
				<li>
					<NavLink to="/welcome">Welcome</NavLink>
				</li>
				{siteEnvironment === "development" && (
					<li>
						<NavLink to="/manage-flashcards">
							Manage Flashcards
						</NavLink>
					</li>
				)}
				<li>
					<NavLink to="/flashcards">Flashcards</NavLink>
				</li>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
			</ul>
		</nav>
	);
};
