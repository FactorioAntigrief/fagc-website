import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Navbar from "./Components/Navbar/navbar"
import CommunityProfilePage from "./Pages/CommunityProfile/CommunityProfile"

export default function App(): JSX.Element {
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
