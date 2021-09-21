import { Profile } from 'fagc-api-types'
import React, { useEffect, useState } from 'react'
import {Grid, Paper} from "@mui/material/"
import { FAGC } from '../../FAGC'
import ReportComponent from '../Report/report'


interface CommunityProfileProps {
	playername: string
	communityId: string
}

const CommunityProfile: React.FC<CommunityProfileProps> = ({playername, communityId}: CommunityProfileProps) => {
	const [profile, setProfile] = useState<Profile|null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			const r = await FAGC.profiles.fetchCommunity(playername, communityId)
			setProfile(r)
			if (r) {
				await FAGC.communities.fetchCommunity(r.communityId)
			}
			setLoading(false)
		})()
	})

	if (profile) {
		const community = FAGC.communities.resolveID(profile.communityId)
		return (
			<Grid item xs="auto">
				<Paper style={{margin: -16, padding: 16}}>
					<p>Playername: {profile.playername}</p>
					<p>Community: {`${community?.name} (${community?.id})`}</p>
					{/* re-fetching the report wont matter here since the reports are cached */}
					{profile.reports.map((profile, i) => <ReportComponent id={profile.id} key={i} /> )}
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
