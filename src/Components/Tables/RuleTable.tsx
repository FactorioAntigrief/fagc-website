import { Report, Community, Rule, CommunityConfig } from "fagc-api-types"
import React, { useEffect, useState } from "react"
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridRowModel,
} from "@mui/x-data-grid"
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

interface RuleTableProps {
	rules: Rule[]
}

const RuleTable: React.FC<RuleTableProps> = ({ rules }: RuleTableProps) => {
	const [detailedOpened, setDetailedOpened] = useState(false)
	const [detailedRule, setDetailedRule] = useState<Rule | null>(null)

	const styles = useStyles()

	const displayDetailedRule = (params: GridRowParams) => {
		const rule = rules.find((rule) => rule.id === params.row.id)
		if (!rule) return
		setDetailedRule(rule)
		setDetailedOpened(true)
	}

	const rows: GridRowModel[] = rules.map((rule) => {
		return {
			id: rule.id,
			col1: rule.id,
			col2: rule.shortdesc,
		}
	})

	const columns: GridColDef[] = [
		{
			field: "infoButton",
			headerName: "",
			renderCell: (params) => (
				<IconButton onClick={() => displayDetailedRule(params.row.id)}>
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
			headerName: "Short description",
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
			<DialogTitle>Rule ID {detailedRule?.id}</DialogTitle>
			<DialogContent>
				<DialogContentText>ID: {detailedRule?.id}</DialogContentText>
				<DialogContentText>
					Rule short description: {detailedRule?.shortdesc}
				</DialogContentText>
				<DialogContentText>
					Broken Rule long description: {detailedRule?.longdesc}
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
				onRowDoubleClick={displayDetailedRule}
			/>
			{DetailedReportDialog}
		</>
	)
}
export default RuleTable
