import { Report, Community, Rule } from "fagc-api-types"
import React, { useState } from "react"
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridRowModel,
	useGridApiContext,
	useGridState,
} from "@mui/x-data-grid"
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Pagination,
	IconButton,
} from "@mui/material"
import { InfoTwoTone } from "@mui/icons-material"
import { useStyles } from "../../Other/themes/styles"
import RuleComponent from "../FAGCBase/rule"

interface RuleTableProps {
	rules: (Rule & {
		reportCount?: number
	})[]
	showReportCount?: boolean
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

const RuleTable: React.FC<RuleTableProps> = ({
	rules,
	showReportCount = false,
}) => {
	const [detailedOpened, setDetailedOpened] = useState(false)
	const [detailedRule, setDetailedRule] = useState<Rule | null>(null)
	const styles = useStyles()

	const displayDetailedRule = (params: string) => {
		const rule = rules.find((rule) => rule.id === params)
		if (!rule) return
		setDetailedRule(rule)
		setDetailedOpened(true)
	}

	const rows: GridRowModel[] = rules.map((rule) => {
		return {
			id: rule.id,
			col1: rule.id,
			col2: rule.shortdesc,
			col3: rule.reportCount ?? 0,
		}
	})

	const columns: GridColDef[] = [
		{
			field: "infoButton",
			headerName: "",
			renderCell: (params) => (
				<IconButton onClick={() => displayDetailedRule(params.row.id)}>
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
			headerName: "Short description",
			// width: 144,
			width: 288,
			cellClassName: styles.p,
			headerClassName: styles.p,
		},
	]
	if (showReportCount)
		columns.push({
			field: "col3",
			headerName: "Report count",
			width: 128,
			cellClassName: styles.p,
			headerClassName: styles.p,
		})

	const DetailedReportDialog = (
		<Dialog open={detailedOpened} onClose={() => setDetailedOpened(false)}>
			<DialogContent>
				{detailedRule && <RuleComponent id={detailedRule.id} />}
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
				components={{
					Pagination: CustomPagination,
				}}
				classes={{
					selectedRowCount: styles.p,
					rowCount: styles.p,
				}}
				pageSize={10}
			/>
			{DetailedReportDialog}
		</div>
	)
}
export default RuleTable
