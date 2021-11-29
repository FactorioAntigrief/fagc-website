import { Report } from "fagc-api-types"
import React, { useEffect } from "react"
import { Skeleton } from "@mui/material/"
import { useFetchRuleId } from "../Hooks/fetchRule"
import { useStyles } from "../../Other/themes/styles"

interface RuleProps {
	id: string
}

const RuleComponent: React.FC<RuleProps> = ({ id }) => {
	const classes = useStyles()
	const [{ rule, loading: ruleLoading }, setRule] = useFetchRuleId()
	useEffect(() => {
		setRule(id)
	}, [id])

	const skeleton = (width: string) => <Skeleton width={width} />

	return (
		<>
			<p className={classes.p}>Rule ID: {id}</p>
			<p className={classes.p}>
				Rule short description:{" "}
				{ruleLoading ? skeleton("6em") : rule?.shortdesc}
			</p>
			<p className={classes.p}>
				Rule long description:{" "}
				{ruleLoading ? skeleton("6em") : rule?.longdesc}
			</p>
		</>
	)
}
export default RuleComponent
