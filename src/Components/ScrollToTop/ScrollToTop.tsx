import React, { useEffect, useState } from 'react'
import { Fab, IconButton, Zoom, Button } from '@mui/material'
import {ExpandLess} from "@mui/icons-material"
import "./ScrollToTop.css"

const ScrollToTopComponent: React.FC = () => {
	const [shown, setShown] = useState(true)

	const handleScroll = () => {
		setShown(window.screenY > 300)
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<Zoom
			in={shown}
			>
				<Fab className="scrollbutton">
					<Button
						onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
					>
						<IconButton><ExpandLess /></IconButton>
					</Button>
				</Fab>
		</Zoom>
	)
}
export default ScrollToTopComponent