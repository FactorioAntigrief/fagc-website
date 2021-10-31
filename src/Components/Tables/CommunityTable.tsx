import React, { useState } from "react"
import { Community } from "fagc-api-types"
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
import { useFetchCommunity } from "../Hooks/fetchCommunity"
import { useFetchRuleId } from "../Hooks/fetchRule"
import ReportComponent from "../FAGCBase/report"
import { themeDark } from "../../Other/themes/themeDark"
import CommunityComponent from "../FAGCBase/community"

interface CommunityTableProps {
	communities: (Community & {
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

const CommunityTable: React.FC<CommunityTableProps> = ({
	communities,
	showReportCount,
}) => {
	const [detailedOpened, setDetailedOpened] = useState(false)
	const [community, setCommunity] = useState<Community | null>(null)

	const styles = useStyles()

	const displayDetailedCommunity = (id: string) => {
		const community = communities.find((community) => community.id === id)
		console.log(community)
		if (!community) return
		setCommunity(community)
		setDetailedOpened(true)
	}

	const rows: GridRowModel[] = communities.map((community) => {
		return {
			id: community.id,
			col1: community.id,
			infoButton: "info button",
			col2: community.name,
			col3: community.contact,
			col4: community.reportCount ?? 0,
		}
	})
	const columns: GridColDef[] = [
		{
			field: "infoButton",
			headerName: "",
			renderCell: (params) => (
				<IconButton
					onClick={() => displayDetailedCommunity(params.row.id)}
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
			headerName: "Name",
			width: 288,
			cellClassName: styles.p,
			headerClassName: styles.p,
		},
		{
			field: "col3",
			headerName: "Contact",
			width: 198,
			cellClassName: styles.pmono,
			headerClassName: styles.p,
		},
	]
	if (showReportCount)
		columns.push({
			field: "col4",
			headerName: "Report count",
			width: 128,
			cellClassName: styles.p,
			headerClassName: styles.p,
		})

	const DetailedCommunityDialog = (
		<Dialog open={detailedOpened} onClose={() => setDetailedOpened(false)}>
			<DialogContent>
				{community && <CommunityComponent id={community.id} />}
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
			{DetailedCommunityDialog}
		</div>
	)
}
export default CommunityTable
