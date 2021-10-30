import React, { useEffect, useState } from "react"
import { Paper, Input, Divider, Typography } from "@mui/material"
import CommunityProfile from "../../Components/Profile/communityprofile"
import { useDebounce, useEffectOnce } from "react-use"
import { useStyles } from "../../Other/themes/styles"
import useFetchCommunity from "../../Components/Hooks/fetchCommunity"
import useFetchCommunityProfile from "../../Components/Hooks/fetchProfile"
import { Rule, Report } from "fagc-api-types"
import ReportTable from "../../Components/Tables/ReportTable"
import RuleTable from "../../Components/Tables/RuleTable"
import {
	useFetchAllRules,
	useFetchRulesId,
} from "../../Components/Hooks/fetchRule"

const CommunityProfilePage = (): JSX.Element => {
	const classes = useStyles()
	const [{ loading: communityLoading, community }, setCommunity] =
		useFetchCommunity()
	const [{ loading: profileLoading, profiles }, setProfileData] =
		useFetchCommunityProfile()

	const [{ rules: allRules }, fetchAllRules] = useFetchAllRules()
	const [playername, setPlayername] = useState<string | undefined>(undefined)
	const [reports, setReports] = useState<Report[]>([])
	const [rawPlayername, setRawPlayername] = useState<string | undefined>(
		undefined
	)
	const [rawCommunityId, setRawCommunityId] = useState<string | undefined>(
		undefined
	)
	const [rules, setRules] = useState<
		(Rule & {
			reportCount?: number
		})[]
	>([])

	useEffectOnce(() => {
		fetchAllRules()
	})

	useEffect(() => {
		const reports = profiles.map((profile) => profile.reports).flat()
		setReports(reports)
		console.log(
			Array.from(new Set(reports.map((report) => report.brokenRule)))
		)
	}, [profiles])
	// get the report counts for the rules
	useEffect(() => {
		const rules: (Rule & {
			reportCount: number
		})[] = allRules.map((rule) => {
			return {
				...rule,
				reportCount: 0,
			}
		})
		reports.forEach((report) => {
			const rule = rules.find((rule) => rule.id === report.brokenRule)
			if (rule) rule.reportCount++
		})
		setRules(rules.filter((rule) => rule.reportCount > 0))
	}, [allRules, reports])

	useDebounce(
		() => {
			if (rawPlayername !== undefined) setPlayername(rawPlayername)
		},
		500,
		[rawPlayername]
	)
	useDebounce(
		() => {
			if (rawCommunityId !== undefined) setCommunity(rawCommunityId)
		},
		500,
		[rawCommunityId]
	)
	useEffect(() => {
		if (!playername) return
		setProfileData(playername, community ? community.id : undefined)
	}, [playername, community])

	return (
		<Paper
			elevation={1}
			style={{
				alignContent: "center",
				margin: 32,
				padding: 16,
				width: 768 + 32,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Input
					placeholder="Playername"
					defaultValue={rawPlayername}
					onChange={(event) => setRawPlayername(event.target.value)}
					style={{ display: "inline-block" }}
					classes={{
						input: classes.p,
					}}
				/>
				<Input
					placeholder="Community ID"
					defaultValue={rawCommunityId}
					onChange={(event) => setRawCommunityId(event.target.value)}
					style={{ display: "inline-block" }}
					classes={{
						input: classes.pmono,
					}}
				/>
			</div>
			<Divider />
			<Typography variant="h4" className={classes.h4}>
				Reports
			</Typography>
			<ReportTable reports={reports} />
			<Divider />
			<Typography variant="h4" className={classes.h4}>
				Broken Rules
			</Typography>
			<RuleTable rules={rules} showReportCount />
		</Paper>
	)
}
export default CommunityProfilePage
