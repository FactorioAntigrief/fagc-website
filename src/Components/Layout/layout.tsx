import { Component } from "react"
import CustomTextField from "../TextField/textfield"

interface LayoutProps {
    page: string
    pageSearchTerms: string[]
}
interface LayoutState {
    page: string
    pageSearchTerms: string[]
}

export default class Layout extends Component<LayoutProps, LayoutState> {
	constructor(props: LayoutProps) {
		super(props)
		this.state = props
	}
	render() {
		return (
			<div>Hi</div>
		)
	}
}