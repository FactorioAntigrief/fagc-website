import React, { useEffect, useMemo, useState } from "react"
import { Paper, Input, Divider, Typography } from "@mui/material"
import CommunityProfile from "../../Components/Profile/communityprofile"
import { useDebounce, useEffectOnce } from "react-use"
import { useStyles } from "../../Other/themes/styles"
import {
	useFetchCommunitiesIds,
	useFetchCommunity,
} from "../../Components/Hooks/fetchCommunity"
import useFetchCommunityProfile from "../../Components/Hooks/fetchProfile"
import { Rule, Report, Community } from "fagc-api-types"
import ReportTable from "../../Components/Tables/ReportTable"
import RuleTable from "../../Components/Tables/RuleTable"
import { useFetchAllRules } from "../../Components/Hooks/fetchRule"
import CommunityTable from "../../Components/Tables/CommunityTable"

const CommunityProfilePage = (): JSX.Element => {
	const classes = useStyles()
	const [{ community }, setCommunity] = useFetchCommunity()
	const [{ communities: rawCommunities }, setCommunities] =
		useFetchCommunitiesIds()
	const [{ profiles }, setProfileData] = useFetchCommunityProfile()

	const [{ rules: allRules }, fetchAllRules] = useFetchAllRules()
	const [playername, setPlayername] = useState<string | undefined>(undefined)
	const [rawPlayername, setRawPlayername] = useState<string | undefined>(
		undefined
	)
	const [rawCommunityId, setRawCommunityId] = useState<string | undefined>(
		undefined
	)

	useEffectOnce(() => {
		fetchAllRules()
	})

	const reports = useMemo(
		() => profiles.map((profile) => profile.reports).flat(),
		[profiles]
	)

	// get the report counts for the rules
	const rules = useMemo(() => {
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
		return rules.filter((rule) => rule.reportCount > 0)
	}, [allRules, reports])

	useEffect(() => {
		const communityIds = profiles.map((profile) => profile.communityId)
		setCommunities(communityIds)
	}, [profiles])

	// get report counts for communities
	const communities = useMemo(() => {
		const communities: (Community & {
			reportCount: number
		})[] = rawCommunities.map((community) => {
			return {
				...community,
				reportCount: 0,
			}
		})
		reports.forEach((report) => {
			const community = communities.find(
				(community) => community.id === report.communityId
			)
			if (community) community.reportCount++
		})
		return communities.filter((community) => community.reportCount > 0)
	}, [rawCommunities, reports])

	useDebounce(
		() => {
			if (rawPlayername !== undefined) setPlayername(rawPlayername)
			console.log(rawPlayername !== undefined)
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
			<Divider />
			<Typography variant="h4" className={classes.h4}>
				Communities
			</Typography>
			<CommunityTable communities={communities} showReportCount />
		</Paper>
	)
}
export default CommunityProfilePage
