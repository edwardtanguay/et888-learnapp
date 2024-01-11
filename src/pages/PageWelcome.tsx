import { useContext } from "react"
import { AppContext } from "../AppContext"

export const PageWelcome = () => {
	const { siteEnvironment } = useContext(AppContext)

	return (
		<>
		<p>This is the welcome page.</p>
			<p>Site is running in <b>{siteEnvironment}</b> mode.</p>
		</>
	)
}