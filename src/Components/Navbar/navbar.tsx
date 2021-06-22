import { Component, ReactElement } from "react"
import "./navbar.css"

interface NavbarProps {
	pages: string[]
}
interface NavbarState {
	currentPage: string
}

export default class Navbar extends Component<NavbarProps, NavbarState> {
	constructor(props: NavbarProps) {
		super(props)
		this.setState({
			currentPage: this.props.pages[0]
		})
		this.state = { currentPage: this.props.pages[0] }
	}
	render(): ReactElement[] {
		const { currentPage } = this.state
		return (
			this.props.pages.map(page => {
				if (page !== currentPage) return <h1 className="navbarNonCurrentPage">{page}</h1>
				return <h1 className="navbarCurrentPage">{page}</h1>
			})
		)
	}
}