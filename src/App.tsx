import React from "react"
import "./App.css"
import { Grid } from "@mui/material"

import ReportComponent from "./Components/FAGCBase/report"
import CommunityProfile from "./Pages/CommunityProfile/CommunityProfile"

function App(): JSX.Element {
	return (
		<div
			className="App"
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{/* <Grid container direction="column" alignItems="center"> */}
			{/* <ReportComponent id={"PmwQAVC"} /> */}
			<CommunityProfile />
			{/* </Grid> */}
		</div>
	)
}

export default App
