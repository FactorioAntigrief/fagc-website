import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./FAGC"
import { ThemeProvider } from "@mui/material"
import { themeDark } from "./Other/themes/themeDark"
import ScrollToTopComponent from "./Components/ScrollToTop/ScrollToTop"

ReactDOM.render(
	<React.StrictMode>
		{/* <ThemeProvider theme={themeDark}> */}
		<App />
		{/* </ThemeProvider> */}
		<ScrollToTopComponent />
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
