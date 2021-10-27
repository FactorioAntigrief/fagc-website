import { Report, Community, Rule } from "fagc-api-types"
import React, { useEffect, useState } from "react"
import { FAGC } from "../../FAGC"
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridRowParams,
	GridRowProps,
	GridRowModel,
} from "@mui/x-data-grid"
import {
	Skeleton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
} from "@mui/material"
import { useStyles } from "../../Other/themes/styles"

interface ReportTableProps {
	reports: Report[]
	withProfileData?: boolean
}

const ReportTable: React.FC<ReportTableProps> = ({
	reports,
	withProfileData = true,
}: ReportTableProps) => {
	const [detailedReportId, setDetailedReportId] = useState<string | null>(
		null
	)
	const [detailedOpened, setDetailedOpened] = useState(false)
	const [detailedReport, setDetailedReport] = useState<Report | null>(null)
	const [detailedReportCommunity, setDetailedReportCommunity] =
		useState<Community | null>(null)
	const [detailedReportRule, setDetailedReportRule] = useState<Rule | null>(
		null
	)
	const [fetchingDetailedReport, setFetchingDetailedReport] = useState(false)
	const styles = useStyles()

	useEffect(() => {
		if (fetchingDetailedReport || !detailedReportId) return
		const fetchReport = async () => {
			setFetchingDetailedReport(true)
			setDetailedReport(null)

			// this must exist since it has been set in displayDetailedReport
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const report = reports.find(
				(report) => report.id === detailedReportId
			)!

			const rule = await FAGC.rules.fetchRule(report.brokenRule)
			const community = await FAGC.communities.fetchCommunity(
				report.communityId
			)

			setDetailedReportRule(rule)
			setDetailedReportCommunity(community)
			setDetailedReport(report)
			setFetchingDetailedReport(false)
		}
		fetchReport()
	}, [detailedReportId])

	const rows: GridRowModel[] = reports.map((report) => {
		return {
			id: report.id,
			col1: report.id,
			col2: report.playername,
			col3: report.brokenRule,
			col4: report.communityId,
			col5: report.adminId,
		}
	})

	const columns: GridColDef[] = [
		{
			field: "col1",
			headerName: "ID",
			cellClassName: styles.pmono,
		},
		{
			field: "col2",
			headerName: "Playername",
			width: 144,
			cellClassName: styles.p,
		},
		{
			field: "col3",
			headerName: "Broken rule",
			width: 120,
			cellClassName: styles.pmono,
		},
		{
			field: "col4",
			headerName: "Community ID",
			width: 128,
			cellClassName: styles.pmono,
		},
		{
			field: "col5",
			headerName: "Admin ID",
			width: 196,
			cellClassName: styles.pmono,
		},
	]

	const displayDetailedReport = (params: GridRowParams) => {
		setDetailedReportId(params.row.col1)
		setDetailedOpened(true)
	}

	const DetailedReportDialog = (
		<Dialog open={detailedOpened} onClose={() => setDetailedOpened(false)}>
			<DialogTitle>Report with ID {detailedReportId}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Playername: {detailedReport?.playername}
				</DialogContentText>
				<DialogContentText>
					Broken rule ID: {detailedReport?.brokenRule}
				</DialogContentText>
				<DialogContentText>
					Broken Rule short description:{" "}
					{!fetchingDetailedReport ? (
						detailedReportRule?.shortdesc
					) : (
						<Skeleton style={{ display: "inline" }} width="4rem" />
					)}
				</DialogContentText>
				<DialogContentText>
					Broken Rule long description:{" "}
					{!fetchingDetailedReport ? (
						detailedReportRule?.longdesc
					) : (
						<Skeleton style={{ display: "inline" }} width="4rem" />
					)}
				</DialogContentText>
				<DialogContentText>
					Community ID: {detailedReport?.communityId}
				</DialogContentText>
				<DialogContentText>
					Community name:{" "}
					{!fetchingDetailedReport ? (
						detailedReportCommunity?.name
					) : (
						<Skeleton style={{ display: "inline" }} width="4rem" />
					)}
				</DialogContentText>
				<DialogContentText>
					Community contact:{" "}
					{!fetchingDetailedReport ? (
						detailedReportCommunity?.contact
					) : (
						<Skeleton style={{ display: "inline" }} width="4rem" />
					)}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	)

	return (
		<>
			<DataGrid
				rows={rows}
				columns={columns}
				classes={{
					// TODO: fix footer colors to not let them be white
					rowCount: styles.columnHeader,
					columnHeader: styles.columnHeader,
				}}
				onRowDoubleClick={displayDetailedReport}
			/>
			{DetailedReportDialog}
		</>
	)
}
export default ReportTable
