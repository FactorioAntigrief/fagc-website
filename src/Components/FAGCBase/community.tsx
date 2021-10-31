import { Report } from "fagc-api-types"
import React, { useEffect, useState } from "react"
import { Grid, Paper, Skeleton } from "@mui/material/"
import { FAGC } from "../../FAGC"
import { useFetchCommunity } from "../Hooks/fetchCommunity"
import { useFetchRuleId } from "../Hooks/fetchRule"
import { useStyles } from "../../Other/themes/styles"

interface CommunityProps {
	id: string
}

const CommunityComponent: React.FC<CommunityProps> = ({ id }) => {
	const classes = useStyles()
	const [{ community, loading: communityLoading }, setCommunity] =
		useFetchCommunity()

	useEffect(() => {
		setCommunity(id)
	}, [id])

	const skeleton = (width: string) => <Skeleton width={width} />

	return (
		<>
			<p className={classes.p}>Community ID: {id}</p>
			<p className={classes.p}>
				Community name:{" "}
				{communityLoading ? skeleton("6em") : community?.name}
			</p>
			<p className={classes.p}>
				Community contact:{" "}
				{communityLoading ? skeleton("6em") : community?.contact}
			</p>
		</>
	)
}
export default CommunityComponent
