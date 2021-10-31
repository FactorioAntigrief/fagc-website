import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
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
