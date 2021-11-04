import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { AppBar, Toolbar, Link, Button, IconButton } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffectOnce } from "react-use"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setUser } from "../../redux/user"
import { useFetchSignupURL, useSignup } from "../Hooks/User"

interface NavbarProps {
	pages: Map<string, string>
	currentPage: Record<"page" | "location", string>
}

const Navbar = ({ pages, currentPage }: NavbarProps): JSX.Element => {
	const history = useHistory()
	const [{ url }] = useFetchSignupURL()
	const [{ user: fetchedUser }, signupOrLogin] = useSignup()
	const { enqueueSnackbar } = useSnackbar()

	const user = useAppSelector((data) => data.user)
	const dispatch = useAppDispatch()
	const logout = () => {}

	useEffectOnce(() => {
		const params = new URL(window.location.href)
		const code = params.searchParams.get("code")
		const state = params.searchParams.get("state")
		console.log(code, state)
		if (
			code &&
			typeof code === "string" &&
			state &&
			typeof state === "string"
		) {
			signupOrLogin(code, state)
		}
	})
	useEffect(() => {
		// TODO: make these appear only if the user has finished with the logging in/out process and not when the page refreshes
		if (user.discordUserTag)
			enqueueSnackbar(`You have been logged in as ${user.discordUserTag}`)
		else enqueueSnackbar("You have been logged out")
	}, [user])
	useEffect(() => {
		if (fetchedUser) {
			dispatch(setUser({ user: fetchedUser }))
			history.push("/")
		}
	}, [fetchedUser])

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
				{user.user ? (
					<Button onClick={logout} style={{ float: "right" }}>
						<IconButton>Log out</IconButton>
					</Button>
				) : (
					<Button href={url ?? undefined} style={{ float: "right" }}>
						<IconButton>Log in</IconButton>
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}
export default Navbar
