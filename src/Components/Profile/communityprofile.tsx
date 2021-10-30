import React, { useEffect } from "react"
import { Grid, Paper, Skeleton, Typography } from "@mui/material/"
import ReportTable from "../Tables/ReportTable"
import { useStyles } from "../../Other/themes/styles"
import useFetchCommunityProfile from "../Hooks/fetchProfile"
import useFetchCommunity from "../Hooks/fetchCommunity"

interface CommunityProfileProps {
	playername?: string
	communityId?: string
}

const CommunityProfile: React.FC<CommunityProfileProps> = ({
	playername,
	communityId,
}: CommunityProfileProps) => {
	const [{ loading: profileLoading, profile: profiles }, setProfileData] =
		useFetchCommunityProfile()
	const [{ loading: communityLoading, community }, setCommunity] =
		useFetchCommunity()
	const styles = useStyles()

	useEffect(() => {
		if (playername) setProfileData(playername, communityId)
		if (communityId) setCommunity(communityId)
	}, [playername, communityId])

	const reports = profiles.map((profile) => profile.reports).flat()

	return (
		<Grid item xs="auto">
			<Paper
				style={{
					margin: 16,
					padding: 16,
					alignItems: "center",
					alignContent: "center",
				}}
				elevation={2}
			>
				{playername ? (
					<Typography variant="h2" className={styles.p}>
						Playername: {playername}
					</Typography>
				) : (
					<Typography variant="h2" className={styles.p}>
						No playername provided
					</Typography>
				)}
				{/* this depends on communityId because it isnt there if there are multiple communities */}
				{communityId ? (
					<Typography variant="h3" className={styles.p}>
						Community:{" "}
						{communityLoading ? (
							<Skeleton
								style={{ display: "inline" }}
								width={"12rem"}
							/>
						) : community ? (
							community.name
						) : (
							"Not found"
						)}
					</Typography>
				) : (
					<Typography variant="h3" className={styles.p}>
						No community specified
					</Typography>
				)}

				<div
					style={{
						height: 384,
						width: 768,
						marginLeft: "auto",
						marginRight: "auto",
					}}
				>
					<ReportTable reports={reports} />
				</div>
			</Paper>
		</Grid>
	)
}
export default CommunityProfile
