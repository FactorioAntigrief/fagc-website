import React, { useState } from "react"
import { Fab, IconButton, Zoom, Button } from "@mui/material"
import { ExpandLess } from "@mui/icons-material"

const ScrollToTopComponent: React.FC = () => {
	const [shown, setShown] = useState(false)

	const handleScroll = () => {
		setShown(window.scrollY > 100)
	}

	window.addEventListener("scroll", handleScroll)

	return (
		<Zoom in={shown}>
			<Fab
				sx={{
					position: "fixed",
					bottom: "50px",
					right: "50px",
				}}
			>
				<Button
					// className="scrollbutton"
					onClick={() =>
						window.scrollTo({ top: 0, behavior: "smooth" })
					}
				>
					<IconButton>
						<ExpandLess />
					</IconButton>
				</Button>
			</Fab>
		</Zoom>
	)
}
export default ScrollToTopComponent
