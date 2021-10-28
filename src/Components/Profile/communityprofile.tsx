import { Profile } from "fagc-api-types"
import React, { useEffect, useState } from "react"
import { Grid, Paper, Skeleton, Typography } from "@mui/material/"
import { FAGC } from "../../FAGC"
import ReportTable from "../Tables/ReportTable"
import { useStyles } from "../../Other/themes/styles"
import useFetchCommunityProfile from "../Hooks/fetchProfile"

interface CommunityProfileProps {
	playername: string
	communityId: string
}

const CommunityProfile: React.FC<CommunityProfileProps> = ({
	playername,
	communityId,
}: CommunityProfileProps) => {
	// TODO: complete this page
	// TODO: create a hook for fetching multiple rules + communities
	const [{ loading: profileLoading }, setProfileData] =
		useFetchCommunityProfile()
	const [loading, setLoading] = useState(true)
	const styles = useStyles()

	useEffect(() => {
		const fetchData = async () => {
			const r = await FAGC.profiles.fetchCommunity(
				playername,
				communityId
			)
			setProfile(r)
			if (r) {
				await FAGC.communities.fetchCommunity(r.communityId)
			}
			setLoading(false)
		}
		fetchData()
	}, [])

	const skeleton = (width?: string | number) => (
		<Skeleton style={{ display: "inline-block" }} width={width ?? "4em"} />
	)
	if ((profile && !loading) || (!profile && loading)) {
		const community = FAGC.communities.resolveID(profile?.communityId || "")
		return (
			// <Grid item xs="auto">
			<Paper
				style={{
					margin: 16,
					padding: 16,
					alignItems: "center",
					alignContent: "center",
				}}
				elevation={1}
			>
				{/* TODO: get this to be white text */}
				<Typography variant="h2" className={styles.p}>
					Playername: {loading ? skeleton() : profile?.playername}
				</Typography>
				<Typography variant="h3" className={styles.p}>
					Community:{" "}
					{loading
						? skeleton("6em")
						: `${community?.name} (${community?.id})`}
				</Typography>

				{profile && profile.reports && (
					<div
						style={{
							height: 384,
							width: 768,
							marginLeft: "auto",
							marginRight: "auto",
						}}
					>
						<ReportTable reports={profile.reports} />
					</div>
				)}
			</Paper>
			// </Grid>
		)
	}
	if (loading)
		return (
			<Grid item xs="auto">
				<p>Loading...</p>
			</Grid>
		)
	return <div>An error occured</div>
}
export default CommunityProfile
