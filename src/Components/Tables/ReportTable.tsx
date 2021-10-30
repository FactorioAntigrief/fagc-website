import React, { useState } from "react"
import { Report } from "fagc-api-types"
import {
	DataGrid,
	GridColDef,
	GridRowModel,
	useGridApiContext,
	useGridState,
} from "@mui/x-data-grid"
import { Dialog, DialogContent, IconButton, Pagination } from "@mui/material"
import { InfoTwoTone } from "@mui/icons-material"
import { useStyles } from "../../Other/themes/styles"
import useFetchCommunity from "../Hooks/fetchCommunity"
import { useFetchRuleId } from "../Hooks/fetchRule"
import ReportComponent from "../FAGCBase/report"
import { themeDark } from "../../Other/themes/themeDark"

interface ReportTableProps {
	reports: Report[]
}

const CustomPagination = () => {
	const apiRef = useGridApiContext()
	const [state] = useGridState(apiRef)
	const styles = useStyles()

	return (
		<Pagination
			sx={{
				"& .MuiPaginationItem-root": {
					color: "#ddd9d9",
					// backgroundColor: "tomato",
				},
				"& .MuiButtonBase-root": {
					backgroundColor: "#223f4cc9",
				},
			}}
			// color={"primary"}
			className={styles.pmono}
			count={state.pagination.pageCount}
			page={state.pagination.page + 1}
			variant="outlined"
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
		/>
	)
}

const ReportTable: React.FC<ReportTableProps> = ({
	reports,
}: ReportTableProps) => {
	const [detailedOpened, setDetailedOpened] = useState(false)
	const [report, setReport] = useState<Report | null>(null)
	const [{ community, loading: loadingCommunity }, setCommunity] =
		useFetchCommunity()
	const [{ rule, loading: loadingRule }, setRule] = useFetchRuleId()
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
					<InfoTwoTone
						style={{
							color: "#ddd9d9",
						}}
					/>
				</IconButton>
			),
			width: 50,
			// minWidth: 64,
			sortable: false,
			resizable: false,
			disableColumnMenu: true,
			align: "left",
			headerClassName: styles.p,
		},
		{
			field: "col1",
			headerName: "ID",
			cellClassName: styles.pmono,
			headerClassName: styles.p,
		},
		{
			field: "col2",
			headerName: "Playername",
			width: 144,
			cellClassName: styles.p,
			headerClassName: styles.p,
		},
		{
			field: "col3",
			headerName: "Broken rule",
			width: 120,
			cellClassName: styles.pmono,
			headerClassName: styles.p,
		},
		{
			field: "col4",
			headerName: "Community ID",
			width: 128,
			cellClassName: styles.pmono,
			headerClassName: styles.p,
		},
		{
			field: "col5",
			headerName: "Admin ID",
			width: 196,
			cellClassName: styles.pmono,
			headerClassName: styles.p,
		},
	]

	const DetailedReportDialog = (
		<Dialog open={detailedOpened} onClose={() => setDetailedOpened(false)}>
			<DialogContent>
				{report && <ReportComponent id={report.id} />}
			</DialogContent>
		</Dialog>
	)

	return (
		<div
			style={{
				height: 384,
				width: 768,
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				classes={{
					selectedRowCount: styles.p,
					rowCount: styles.p,
				}}
				components={{
					Pagination: CustomPagination,
				}}
				pageSize={10}
			/>
			{DetailedReportDialog}
		</div>
	)
}
export default ReportTable
