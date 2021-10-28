import { useEffect, useState } from "react"
import { Rule } from "fagc-api-types"
import { FAGC } from "../../FAGC"

const useFetchRule = (): [
	{ loading: boolean; rule: Rule | null; error: Error | null },
	(id: string) => void
] => {
	const [ruleId, setRuleId] = useState<string | null>(null)
	const [rule, setCommunity] = useState<Rule | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!ruleId) {
			setLoading(false), setError(null)
			setCommunity(null)
			return
		}
		const fetchReport = async () => {
			setLoading(true)
			setError(null)
			setCommunity(null)
			try {
				const rule = await FAGC.rules.fetchRule(ruleId)
				setCommunity(rule)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		fetchReport()
	}, [ruleId])

	return [{ loading, rule, error }, setRuleId]
}
export default useFetchRule
