import React, { useState } from "react"
import { Report } from "fagc-api-types"
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid"
import {
	Skeleton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Divider,
	IconButton,
} from "@mui/material"
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone"
import { useStyles } from "../../Other/themes/styles"
import useFetchReport from "../Hooks/fetchReport"
import useFetchCommunity from "../Hooks/fetchCommunity"
import useFetchRule from "../Hooks/fetchRule"

interface ReportTableProps {
	reports: Report[]
	withProfileData?: boolean
}

const ReportTable: React.FC<ReportTableProps> = ({
	reports,
	withProfileData = true,
}: ReportTableProps) => {
	const [detailedOpened, setDetailedOpened] = useState(false)
	const [report, setReport] = useState<Report | null>(null)
	const [{ community, loading: loadingCommunity }, setCommunity] =
		useFetchCommunity()
	const [{ rule, loading: loadingRule }, setRule] = useFetchRule()
	const styles = useStyles()

	const displayDetailedReport = (id: string) => {
		const report = reports.find((report) => report.id === id)
		if (!report) return
		setReport(report)
		setCommunity(report.communityId)
		setRule(report.brokenRule)
		setDetailedOpened(true)
	}

	const rows: GridRowModel[] = reports.map((report) => {
		return {
			id: report.id,
			col1: report.id,
			infoButton: "info button",
			col2: report.playername,
			col3: report.brokenRule,
			col4: report.communityId,
			col5: report.adminId,
		}
	})
	const columns: GridColDef[] = [
		{
			field: "infoButton",
			headerName: "",
			renderCell: (params) => (
				<IconButton
					onClick={() => displayDetailedReport(params.row.id)}
				>
					<InfoTwoToneIcon />
				</IconButton>
			),
			width: 50,
			// minWidth: 64,
			sortable: false,
			resizable: false,
			disableColumnMenu: true,
			align: "left",
		},
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

	const DetailedReportDialog = (
		<Dialog open={detailedOpened} onClose={() => setDetailedOpened(false)}>
			<DialogTitle>Report with ID {report?.id}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Playername: {report?.playername}
				</DialogContentText>
				<Divider light />
				<DialogContentText>
					Broken rule ID: {report?.brokenRule}
				</DialogContentText>
				<DialogContentText>
					Broken Rule short description:{" "}
					{!loadingRule && rule ? (
						rule.shortdesc
					) : (
						<Skeleton
							style={{ display: "inline-block" }}
							width="16em"
						/>
					)}
				</DialogContentText>
				<DialogContentText>
					Broken Rule long description:{" "}
					{!loadingRule && rule ? (
						rule.longdesc
					) : (
						<>
							<Skeleton
								style={{ display: "inline-block" }}
								width="17em"
							/>
							<Skeleton
								style={{ display: "inline-block" }}
								width="30em"
							/>
						</>
					)}
				</DialogContentText>
				<Divider light />
				<DialogContentText>
					Community ID: {report?.communityId}
				</DialogContentText>
				<DialogContentText>
					Community name:{" "}
					{!loadingCommunity && community ? (
						community?.name
					) : (
						<Skeleton
							style={{ display: "inline-block" }}
							width="20em"
						/>
					)}
				</DialogContentText>
				<DialogContentText>
					Community contact:{" "}
					{!loadingCommunity && community ? (
						community?.contact
					) : (
						<Skeleton
							style={{ display: "inline-block" }}
							width="19em"
						/>
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
				}}
				// onRowClick={displayDetailedReport}
			/>
			{DetailedReportDialog}
		</>
	)
}
export default ReportTable
