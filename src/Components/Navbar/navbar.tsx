import React from "react"
import { AppBar, Toolbar, Link, IconButton } from "@mui/material"

interface NavbarProps {
	pages: Map<string, string>
	currentPage: Record<"page" | "location", string>
}

const Navbar = ({ pages, currentPage }: NavbarProps): JSX.Element => {
	return (
		<AppBar position="static" style={{ marginBottom: 32 }}>
			<Toolbar>
				{Array.from(pages.entries()).map(([page, location], i) => {
					if (
						currentPage.location === location &&
						currentPage.page === page
					) {
						return (
							<Link href={location} color="secondary" key={i}>
								<IconButton>{page}</IconButton>
							</Link>
						)
					}
					return (
						<Link href={location} color="primary" key={i}>
							<IconButton>{page}</IconButton>
						</Link>
					)
				})}
			</Toolbar>
		</AppBar>
	)
}
export default Navbar
