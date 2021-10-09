import { Report } from 'fagc-api-types'
import React, { useEffect, useState } from 'react'
import {Grid, Paper, Skeleton} from "@mui/material/"
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
	}, [])

	if ((report && !loading) || (loading && !report)) {
		if (loading) console.log(report)
		if (!loading) console.log(report)
		const rule = FAGC.rules.resolveID(report?.brokenRule || "")
		const community = FAGC.communities.resolveID(report?.communityId || "")
		const skeleton = (width?: string|number) => <Skeleton style={{display: "inline-block"}} width={width??"4em"} />
		return (
			// <Grid item xs="auto">
				<Paper style={{margin: -16, padding: 16}}>
				<p>Report ID: {id}</p>
				{withProfileData && <p>Playername: {loading ? skeleton("6em") : report?.playername}</p>}
				<p>Broken rule: {loading ? skeleton("6em") : `${rule?.shortdesc} (${rule?.id})`}</p>
				<p>Description: {loading ? skeleton("4em") : report?.description}</p>
				<p>Admin ID: {loading ? skeleton("8em") : report?.adminId}</p>
				{withProfileData && <p>Community: {loading ? skeleton("6em") :`${community?.name} (${community?.id})`}</p>}
				<p>Proof: {loading ? skeleton("4em") : report?.proof}</p>
				</Paper>
			// </Grid>
		)
	}
	return (
		<div>An error occured</div>
	)
}
export default ReportComponent
