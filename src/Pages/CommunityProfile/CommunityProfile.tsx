import React, { useState } from "react"
import { Paper, Input, Divider } from "@mui/material"
import CommunityProfile from "../../Components/Profile/communityprofile"
import { useDebounce } from "react-use"

const CommunityProfilePage = (): JSX.Element => {
	const [playername, setPlayername] = useState<string | undefined>(undefined)
	const [communityId, setCommunityId] = useState<string | undefined>(
		undefined
	)

	const [rawPlayername, setRawPlayername] = useState<string | undefined>(
		undefined
	)
	const [rawCommunityId, setRawCommunityId] = useState<string | undefined>(
		undefined
	)

	useDebounce(
		() => {
			if (rawPlayername !== undefined) setPlayername(rawPlayername)
		},
		500,
		[rawPlayername]
	)
	useDebounce(
		() => {
			if (rawCommunityId !== undefined) setCommunityId(rawCommunityId)
		},
		500,
		[rawCommunityId]
	)

	console.log(playername, communityId)

	return (
		<Paper
			elevation={1}
			style={{ alignContent: "center", margin: 24, padding: 4 }}
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
				/>
				<Input
					placeholder="Community ID"
					defaultValue={rawCommunityId}
					onChange={(event) => setRawCommunityId(event.target.value)}
					style={{ display: "inline-block" }}
				/>
			</div>
			<Divider />
			{
				<CommunityProfile
					playername={playername}
					communityId={communityId && communityId} // this will not pass it on it it is an empty string
				/>
			}
		</Paper>
	)
}
export default CommunityProfilePage
