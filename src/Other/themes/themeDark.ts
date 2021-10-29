import { createTheme } from "@mui/material"

// there once existed themeLight...
export const themeDark = createTheme({
	palette: {
		primary: {
			main: "#adadad",
			light: "#ddd9d9",
			dark: "#a09f9f",
		},
		secondary: {
			main: "#7b1fa2",
			light: "#ae52d4",
			dark: "#4a0072",
		},
		background: {
			default: "#15202B",
			paper: "#263437",
		},
	},
	typography: {
		fontFamily: ["Roboto", "Open Sans"].join(","),
		fontSize: 16,
	},
})
