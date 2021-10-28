// import { Report, Community, Rule, CommunityConfig } from "fagc-api-types"
// import React, { useEffect, useState } from "react"
// import { FAGC } from "../../FAGC"
// import {
// 	DataGrid,
// 	GridColDef,
// 	GridRowParams,
// 	GridRowModel,
// } from "@mui/x-data-grid"
// import {
// 	Skeleton,
// 	Dialog,
// 	DialogTitle,
// 	DialogContent,
// 	DialogContentText,
// 	Divider,
// } from "@mui/material"
// import { useStyles } from "../../Other/themes/styles"

// interface CommunityTableProps {
// 	reports: Community[]
// }

// const CommunityTable: React.FC<CommunityTableProps> = ({
// 	reports: communities,
// }: CommunityTableProps) => {
// 	const [detailedCommunityId, setDetailedCommunityId] = useState<
// 		string | null
// 	>(null)
// 	const [detailedCommunity, setDetailedCommunity] = useState<Community|null>(null)
// 	const [communityConfig, setCommunityConfig] =
// 		useState<CommunityConfig | null>(null)
// 	const [followedRules, setFollowedRules] = useState<Rule[]>([])
// 	const [trustedCommunities, setTrustedCommunities] = useState<Community[]>([])
// 	const [detailedOpened, setDetailedOpened] = useState(false)
// 	const [fetchingDetailedCommunity, setFetchingDetailedCommunity] =
// 		useState(false)
// 	const [fetchingFollowedRules, setFetchingFollowedRules] = useState(false)
// 	const [fetchingTrustedCommunities, setFetchingTrustedCommunities] = useState(false)
// 	const styles = useStyles()

// 	useEffect(() => {
// 		if (fetchingDetailedCommunity || !detailedCommunityId) return
// 		const fetchCommunity = async () => {
// 			setFetchingDetailedCommunity(true)

// 			// this must exist since it has been set in displayDetailedReport
// 			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// 			const community = communities.find(
// 				(community) => community.id === detailedCommunityId
// 			)!
// 			setDetailedCommunity(community)
// 			const communityConfig = await FAGC.communities.fetchConfig(detailedCommunityId)
// 			setCommunityConfig(communityConfig)
// 			setFetchingDetailedCommunity(false)

// 			setFetchingFollowedRules(true)
// 			const rules = communityConfig?.ruleFilters && await Promise.all(communityConfig?.ruleFilters.map((ruleid) =>
// 				FAGC.rules.fetchRule(ruleid)
// 			)).then(c=>c.filter(r=>r)) as Rule[] || []
// 			setFollowedRules(rules)
// 			const a = rules.filter((rule) => rule !== null)
// 			setFetchingFollowedRules(false)
// 		}
// 		fetchCommunity()
// 	}, [detailedCommunityId])
// 	useEffect(() => {
// 		// this function needs to run
// 		const fetchTrustedCommunities = async () => {
// 			setFetchingTrustedCommunities(true)
// 			const communities = communityConfig?.trustedCommunities && await Promise.all(communityConfig?.trustedCommunities.map(communityid =>
// 				FAGC.communities.fetchCommunity(communityid)
// 			)).then(c=>c.filter(r=>r)) as Community[] || []
// 			setTrustedCommunities(communities)
// 			setFetchingTrustedCommunities(false)
// 		}
// 		fetchTrustedCommunities()
// 	}, [communityConfig])
// 	useEffect(() => {
// 		const fetchFollowedRules = async () => {
// 			setFetchingTrustedCommunities(true)
// 			const communities = communityConfig?.trustedCommunities && await Promise.all(communityConfig?.trustedCommunities.map(communityid =>
// 				FAGC.communities.fetchCommunity(communityid)
// 			)).then(c=>c.filter(r=>r)) as Community[] || []
// 			setTrustedCommunities(communities)
// 			setFetchingTrustedCommunities(false)
// 		}
// 		fetchFollowedRules()
// 	}, [communityConfig])

// 	const rows: GridRowModel[] = communities.map((report) => {
// 		return {
// 			id: report.id,
// 			col1: report.id,
// 			col2: report.playername,
// 			col3: report.brokenRule,
// 			col4: report.communityId,
// 			col5: report.adminId,
// 		}
// 	})

// 	const columns: GridColDef[] = [
// 		{
// 			field: "col1",
// 			headerName: "ID",
// 			cellClassName: styles.pmono,
// 		},
// 		{
// 			field: "col2",
// 			headerName: "Playername",
// 			width: 144,
// 			cellClassName: styles.p,
// 		},
// 		{
// 			field: "col3",
// 			headerName: "Broken rule",
// 			width: 120,
// 			cellClassName: styles.pmono,
// 		},
// 		{
// 			field: "col4",
// 			headerName: "Community ID",
// 			width: 128,
// 			cellClassName: styles.pmono,
// 		},
// 		{
// 			field: "col5",
// 			headerName: "Admin ID",
// 			width: 196,
// 			cellClassName: styles.pmono,
// 		},
// 	]

// 	const displayDetailedCommunity = (params: GridRowParams) => {
// 		setDetailedCommunityId(params.row.col1)
// 		setDetailedOpened(true)
// 	}

// 	const DetailedReportDialog = (
// 		<Dialog open={detailedOpened} onClose={() => setDetailedOpened(false)}>
// 			<DialogTitle>Report with ID {detailedCommunityId}</DialogTitle>
// 			<DialogContent>
// 				<DialogContentText>
// 					Playername: {detailedReport?.playername}
// 				</DialogContentText>
// 				<Divider light />
// 				<DialogContentText>
// 					Broken rule ID: {detailedReport?.brokenRule}
// 				</DialogContentText>
// 				<DialogContentText>
// 					Broken Rule short description:{" "}
// 					{!fetchingDetailedCommunity && detailedReportRule ? (
// 						detailedReportRule?.shortdesc
// 					) : (
// 						<Skeleton
// 							style={{ display: "inline-block" }}
// 							width="16em"
// 						/>
// 					)}
// 				</DialogContentText>
// 				<DialogContentText>
// 					Broken Rule long description:{" "}
// 					{!fetchingDetailedCommunity && detailedReportRule ? (
// 						detailedReportRule?.longdesc
// 					) : (
// 						<>
// 							<Skeleton
// 								style={{ display: "inline-block" }}
// 								width="17em"
// 							/>
// 							<Skeleton
// 								style={{ display: "inline-block" }}
// 								width="30em"
// 							/>
// 						</>
// 					)}
// 				</DialogContentText>
// 				<Divider light />
// 				<DialogContentText>
// 					Community ID: {detailedReport?.communityId}
// 				</DialogContentText>
// 				<DialogContentText>
// 					Community name:{" "}
// 					{!fetchingDetailedCommunity && detailedReportCommunity ? (
// 						detailedReportCommunity?.name
// 					) : (
// 						<Skeleton
// 							style={{ display: "inline-block" }}
// 							width="20em"
// 						/>
// 					)}
// 				</DialogContentText>
// 				<DialogContentText>
// 					Community contact:{" "}
// 					{!fetchingDetailedCommunity && detailedReportCommunity ? (
// 						detailedReportCommunity?.contact
// 					) : (
// 						<Skeleton
// 							style={{ display: "inline-block" }}
// 							width="19em"
// 						/>
// 					)}
// 				</DialogContentText>
// 			</DialogContent>
// 		</Dialog>
// 	)
// 	return (
// 		<>
// 			<DataGrid
// 				rows={rows}
// 				columns={columns}
// 				classes={{
// 					// TODO: fix footer colors to not let them be white
// 					rowCount: styles.columnHeader,
// 				}}
// 				onRowDoubleClick={displayDetailedCommunity}
// 			/>
// 			{DetailedReportDialog}
// 		</>
// 	)
// }
// export default CommunityTable
export {}
