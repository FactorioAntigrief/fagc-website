import { ApiID, FAGCWrapper, Report } from "fagc-api-wrapper"
import { Component, ReactElement } from "react"
import { validURL } from "../../functions"
import "./reports.css"

interface ReportProps {
	FAGC: FAGCWrapper
	reportId: ApiID
}
interface ReportState {
	loading: boolean
	data: null | Report
}

export class ReportID extends Component<ReportProps, ReportState> {
	constructor(props: ReportProps) {
		super(props)
		this.state = {
			loading: true,
			data: null,
		}
	}
	async componentDidMount(): Promise<void> {
		console.log(this)
		const report = await this.props.FAGC.reports.fetchReport(this.props.reportId)
		if (report) {
			return this.setState({
				loading: false,
				data: report
			})
		}
		else {
			return this.setState({
				loading: false,
				data: null
			})
		}
	}
	render(): ReactElement {
		const { loading } = this.state
		const { data } = this.state
		if (loading) {
			return (
				<div>
					<p>Loading...</p>
				</div>
			)
		}
		if (!data) {
			return (
				<div>
					<p>An error has occured.</p>
				</div>
			)
		}

		return (
			<div className="Report">
				<p>ID: {data.id}</p>
				<p>Playername: {data.playername}</p>
				<p>Admin ID: {data.adminId}</p>
				<p>Proof: {validURL(data.proof) ? <a href={data.proof}>See here</a> : data.proof}</p>
			</div>
		)
	}
}