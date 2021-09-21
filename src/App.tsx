import React from "react"
import "./App.css"
import {Grid} from "@mui/material"

import ReportComponent from "./Components/Report/report"
import CommunityProfile from "./Components/Profile/communityprofile"

function App(): JSX.Element {
	return (
		<div className="App">
			<Grid container spacing={2} direction="column" alignItems="center">
			{/* <ReportComponent id={"PmwQAVC"} /> */}
			<CommunityProfile playername="Windsinger" communityId="p1UgG0G" />
			</Grid>
		</div>
	)
}

export default App
