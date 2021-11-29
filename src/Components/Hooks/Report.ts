import { useEffect, useState } from "react"
import { Report, Revocation } from "fagc-api-types"
import { FAGC } from "../../FAGC"

export const useFetchReport = (): [
	{ loading: boolean; report: Report | null; error: Error | null },
	(id: string) => void
] => {
	const [reportId, setReportId] = useState<string | null>(null)
	const [report, setReport] = useState<Report | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!reportId) {
			setLoading(false), setError(null)
			setReport(null)
			return
		}
		const fetchReport = async () => {
			setLoading(true)
			setError(null)
			setReport(null)
			try {
				const report = await FAGC.reports.fetchReport(reportId)
				setReport(report)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		fetchReport()
	}, [reportId])

	return [{ loading, report, error }, setReportId]
}

export const useRevokeReport = (): [
	{ loading: boolean; revocation: Revocation | null; error: Error | null },
	(id: string, adminId: string) => void
] => {
	const [reportId, setReportId] = useState<string | null>(null)
	const [adminId, setAdminId] = useState<string | null>(null)
	const [revocation, setRevocation] = useState<Revocation | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!reportId || !adminId) {
			setLoading(false), setError(null)
			setRevocation(null)
			return
		}
		const fetchReport = async () => {
			setLoading(true)
			setError(null)
			setRevocation(null)
			try {
				const report = await FAGC.reports.revoke(
					reportId,
					adminId,
					undefined,
					{ cookieAuth: true }
				)
				setRevocation(report)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		fetchReport()
	}, [reportId])

	return [
		{ loading, revocation, error },
		(id, adminId) => {
			setReportId(id)
			setAdminId(adminId)
		},
	]
}
