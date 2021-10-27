import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./FAGC"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { themeDark } from "./Other/themes/themeDark"
import ScrollToTopComponent from "./Components/ScrollToTop/ScrollToTop"
import { StyledEngineProvider } from "@mui/material/styles"

import "@fontsource/roboto"
import "@fontsource/roboto-mono"

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={themeDark}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<App />
				<ScrollToTopComponent />
			</StyledEngineProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
