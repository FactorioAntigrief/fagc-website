import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import "./FAGC"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { themeDark } from "./Other/themes/themeDark"
import ScrollToTopComponent from "./Components/ScrollToTop/ScrollToTop"
import { StyledEngineProvider } from "@mui/material/styles"
import { Provider as ReduxProvider } from "react-redux"
import { SnackbarProvider } from "notistack"
import ReduxStore from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

import "@fontsource/roboto"
import "@fontsource/roboto-mono"

const persistor = persistStore(ReduxStore)

ReactDOM.render(
	<React.StrictMode>
		<ReduxProvider store={ReduxStore}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={themeDark}>
					<StyledEngineProvider injectFirst>
						<SnackbarProvider maxSnack={3}>
							<CssBaseline />
							<App />
							<ScrollToTopComponent />
						</SnackbarProvider>
					</StyledEngineProvider>
				</ThemeProvider>
			</PersistGate>
		</ReduxProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
