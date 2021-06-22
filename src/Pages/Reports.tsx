import React, { Component, ReactElement } from "react"
import { getRandomApiID } from "../functions"
import TextFieldWithSwitch from "../Components/TextFieldWithSwitch/textfield"
import "./reports.css"
import { ApiID, FAGCWrapper } from "fagc-api-wrapper"
import { ReportID } from "../Components/Reports/reports"

interface ReportManagerProps {
	FAGC: FAGCWrapper
}
interface NoneSearchState {
	searchType: "none"
	searchData: null
}
interface IDSearchState {
	searchType: "id"
	searchData: ApiID
}
type SearchType = 
	| "none"
	| "id"
type ReportManagerState = {
	searchType: "none"
	searchData: null
} | {
	searchType: "id"
	searchData: ApiID
}

export default class Report extends Component<ReportManagerProps, ReportManagerState> {
	constructor(props: ReportManagerProps) {
		super(props)
		this.state = {
			searchType: "none",
			searchData: null
		}
	}
	render(): ReactElement {
		const onSearchByIdChange = (evt: any) => {
			const search = evt.target.value
			console.log({search}, "search")
			this.setState({
				searchType: "id",
				searchData: search,
			})
		}
		const {searchType, searchData} = this.state
		// fix this type shit and send the request
		console.log(searchType, searchData)
		switch (searchType) {
		case "id": {
			return (
				<div className="ReportSelector">
					<TextFieldWithSwitch
						onSearchChange={onSearchByIdChange}
						TextFieldPlaceholders={getRandomApiID}
					/>
					<ReportID FAGC={this.props.FAGC} reportId={searchData as ApiID} />
				</div>
			)
		}
		default: {
			return (
				<div className="ReportSelector">
					<TextFieldWithSwitch
						onSearchChange={onSearchByIdChange}
						TextFieldPlaceholders={getRandomApiID}
					/>
				</div>
			)
		}
		}
	}
}