import { Profile } from 'fagc-api-types'
import React, { useEffect, useState } from 'react'
import {Grid, Paper, Skeleton} from "@mui/material/"
import { FAGC } from '../../FAGC'
import HiddenReportComponent from "../Report/hiddenReport"

interface CommunityProfileProps {
	playername: string
	communityId: string
}

const CommunityProfile: React.FC<CommunityProfileProps> = ({playername, communityId}: CommunityProfileProps) => {
	const [profile, setProfile] = useState<Profile|null>(null)
	const [loading, setLoading] = useState(true)
	const [limit, setLimit] = useState(25)

	useEffect(() => {
		(async () => {
			const r = await FAGC.profiles.fetchCommunity(playername, communityId)
			setProfile(r)
			if (r) {
				await FAGC.communities.fetchCommunity(r.communityId)
			}
			setLoading(false)
		})()
	}, [])

	const skeleton = (width?: string|number) => <Skeleton style={{display: "inline-block"}} width={width??"4em"} />
	if ((profile && !loading) || (!profile && loading)) {
		const community = FAGC.communities.resolveID(profile?.communityId || "")
		return (
			<Grid item xs="auto">
				<Paper style={{margin: -16, padding: 16}} elevation={8}>
					<p>Playername: {loading ? skeleton() : profile?.playername}</p>
					<p>Community: {loading ? skeleton("6em") : `${community?.name} (${community?.id})`}</p>
					{/* re-fetching the report wont matter here since the reports are cached */}
					{profile && profile.reports && profile.reports.map((profile, i) => i < limit && <HiddenReportComponent id={profile.id} key={i} /> )}
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
export default CommunityProfile
