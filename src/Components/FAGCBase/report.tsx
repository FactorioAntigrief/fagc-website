import React, { useEffect } from "react"
import { IconButton, Tooltip, Skeleton } from "@mui/material/"
import { DeleteTwoTone } from "@mui/icons-material"
import { useFetchReport, useRevokeReport } from "../Hooks/Report"
import { useFetchCommunity } from "../Hooks/fetchCommunity"
import { useFetchRuleId } from "../Hooks/fetchRule"
import { useStyles } from "../../Other/themes/styles"
import { useAppSelector } from "../../redux/store"
import { useSnackbar } from "notistack"

interface ReportProps {
	id: string
}

const ReportComponent: React.FC<ReportProps> = ({ id }: ReportProps) => {
	const classes = useStyles()
	const [{ report, loading: reportLoading }, setReport] = useFetchReport()
	const [{ community, loading: communityLoading }, setCommunity] =
		useFetchCommunity()
	const [{ rule, loading: ruleLoading }, setRule] = useFetchRuleId()
	const [
		{ loading: revocationLoading, revocation, error: revocationError },
		revokeReport,
	] = useRevokeReport()
	const { enqueueSnackbar } = useSnackbar()

	console.log(revocation, revocationError)

	useEffect(() => {
		if (!report) return
		setCommunity(report.communityId)
		setRule(report.brokenRule)
	}, [report])
	useEffect(() => {
		setReport(id)
	}, [id])

	const user = useAppSelector((data) => data.user)

	const userHasWriteAccess =
		(user.user &&
			user.user.apiAccess.find(
				(guild) =>
					guild.communityId === report?.communityId && guild.reports
			)) ||
		false
	const revoke = () => {
		if (user.discordUserId && userHasWriteAccess) {
			revokeReport(id, user.discordUserId)
		} else {
			enqueueSnackbar("You do not have access to revoke this report", {
				variant: "error",
			})
		}
	}
	const skeleton = (width: string) => <Skeleton width={width} />
	console.log(
		userHasWriteAccess
			? "Revoke report"
			: "Insuffcient permissions for report revocation"
	)
	return (
		<>
			<p className={classes.p}>Report ID: {id}</p>
			<p className={classes.p}>
				Playername:{" "}
				{reportLoading ? skeleton("6em") : report?.playername}
			</p>
			<p className={classes.p}>
				Broken rule:{" "}
				{ruleLoading
					? skeleton("6em")
					: `${rule?.shortdesc} (${rule?.id})`}
			</p>
			<p className={classes.p}>
				Description:{" "}
				{reportLoading ? skeleton("4em") : report?.description}
			</p>
			<p className={classes.p}>
				Admin ID: {reportLoading ? skeleton("8em") : report?.adminId}
			</p>
			<p className={classes.p}>
				Community:{" "}
				{communityLoading
					? skeleton("6em")
					: `${community?.name} (${community?.id})`}
			</p>
			<p className={classes.p}>
				Proof: {reportLoading ? skeleton("4em") : report?.proof}
			</p>
			<Tooltip
				title={
					userHasWriteAccess
						? "Revoke report"
						: "Insuffcient permissions for report revocation"
				}
			>
				<span
					style={{
						float: "right",
					}}
				>
					<IconButton disabled={!userHasWriteAccess} onClick={revoke}>
						<DeleteTwoTone />
					</IconButton>
				</span>
			</Tooltip>
		</>
	)
}
export default ReportComponent
