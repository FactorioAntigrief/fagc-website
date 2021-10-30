import { makeStyles } from "@mui/styles"
import { themeDark } from "./themeDark"

export const useStyles = makeStyles({
	root: {
		background: themeDark.palette.background.default,
	},
	p: {
		color: "#ddd9d9",
	},
	h4: {
		color: "#ddd9d9",
	},
	pmono: {
		color: "#ddd9d9",
		fontFamily: "Roboto Mono",
	},
	footerData: {
		color: "#ffffff",
	},
	columnHeader: {
		color: "#ffffff",
	},
})
