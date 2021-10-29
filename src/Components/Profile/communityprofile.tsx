import React, { useEffect } from "react"
import { Grid, Paper, Skeleton, Typography } from "@mui/material/"
import ReportTable from "../Tables/ReportTable"
import { useStyles } from "../../Other/themes/styles"
import useFetchCommunityProfile from "../Hooks/fetchProfile"
import useFetchCommunity from "../Hooks/fetchCommunity"

interface CommunityProfileProps {
	playername: string
	communityId: string
}

const CommunityProfile: React.FC<CommunityProfileProps> = ({
	playername,
	communityId,
}: CommunityProfileProps) => {
	const [{ loading: profileLoading, profile }, setProfileData] =
		useFetchCommunityProfile()
	const [{ loading: communityLoading, community }, setCommunity] =
		useFetchCommunity()
	const styles = useStyles()

	useEffect(() => {
		setProfileData(playername, communityId)
		setCommunity(communityId)
	}, [playername, communityId])

	const skeleton = (width?: string | number) => (
		<Skeleton style={{ display: "inline-block" }} width={width ?? "4em"} />
	)
	return (
		<Grid item xs="auto">
			<Paper
				style={{
					margin: 16,
					padding: 16,
					alignItems: "center",
					alignContent: "center",
				}}
				elevation={1}
			>
				<Typography variant="h2" className={styles.p}>
					Playername: {playername}
				</Typography>
				<Typography variant="h3" className={styles.p}>
					Community:{" "}
					{communityLoading || !community ? (
						<Skeleton width={"12rem"} />
					) : (
						community.name
					)}
				</Typography>

				<div
					style={{
						height: 384,
						width: 768,
						marginLeft: "auto",
						marginRight: "auto",
					}}
				>
					<ReportTable reports={profile ? profile.reports : []} />
				</div>
			</Paper>
		</Grid>
	)
	// }
	// if (profileLoading)
	// 	return (
	// 		<Grid item xs="auto">
	// 			<p>Loading...</p>
	// 		</Grid>
	// 	)
	// return <div>An error occured</div>
}
export default CommunityProfile
