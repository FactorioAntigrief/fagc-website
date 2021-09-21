import { Report } from 'fagc-api-types'
import React, { useEffect, useState } from 'react'
import {Grid, Paper} from "@mui/material/"
import { FAGC } from '../../FAGC'


interface ReportProps {
	id: string
	withProfileData?: boolean
}

const ReportComponent: React.FC<ReportProps> = ({id, withProfileData=true}: ReportProps) => {
	const [report, setReport] = useState<Report|null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			const r = await FAGC.reports.fetchReport(id)
			setReport(r)
			if (r) {
				await FAGC.rules.fetchRule(r.brokenRule)
				await FAGC.communities.fetchCommunity(r.communityId)
			}
			setLoading(false)
		})()
	})

	if (report) {
		const rule = FAGC.rules.resolveID(report.brokenRule)
		const community = FAGC.communities.resolveID(report.communityId)
		return (
			<Grid item xs="auto">
				<Paper style={{margin: -16, padding: 16}}>
				<p>Report ID: {id}</p>
				{withProfileData && <p>Playername: {report.playername}</p>}
				<p>Broken rule: {`${rule?.shortdesc} (${rule?.id})`}</p>
				<p>Description: {report.description}</p>
				<p>Admin: {report.adminId}</p>
				{withProfileData && <p>Community: {`${community?.name} (${community?.id})`}</p>}
				<p>Proof: {report.proof}</p>
				</Paper>
			</Grid>
		)
	}
	if (loading) return (
		<Grid item xs="auto">
			<p>Loading...</p>
		</Grid>
	)
	return (
		<div>An error occured</div>
	)
}
export default ReportComponent
