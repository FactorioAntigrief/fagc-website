import React, { useEffect } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Navbar from "./Components/Navbar/navbar"
import CommunityProfilePage from "./Pages/CommunityProfile/CommunityProfile"
import { useEffectOnce } from "react-use"
import { useLogin } from "./Components/Hooks/User"
import { setUser } from "./redux/user"

const getCookie = (name: string) => {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop()?.split(";").shift()
}

export default function App(): JSX.Element {
	const [{ user: fetchedUser }, fetchUser] = useLogin()

	useEffectOnce(() => {
		if (getCookie("qid")) fetchUser()
	})
	useEffect(() => {
		if (fetchedUser) setUser({ user: fetchedUser })
	}, [fetchedUser])

	const pages = new Map<string, string>([
		["Community Profile", "/communityprofile"],
		["Service Manager", "/servicemanager"],
	])
	const currentPage = {
		page: "/",
		location: "/communityprofile",
	}

	return (
		<Router>
			<Navbar pages={pages} currentPage={currentPage} />
			<Route exact path="/">
				<Redirect to="/communityprofile" />
			</Route>
			<Route path="/communityprofile">
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<CommunityProfilePage />
				</div>
			</Route>
		</Router>
	)
}
