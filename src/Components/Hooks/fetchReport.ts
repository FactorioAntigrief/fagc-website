import { useEffect, useState } from "react"
import { Report } from "fagc-api-types"
import { FAGC } from "../../FAGC"

const useFetchReport = (): [
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
export default useFetchReport
