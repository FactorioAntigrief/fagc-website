import { useEffect, useState } from "react"
import { Rule } from "fagc-api-types"
import { FAGC } from "../../FAGC"

/**
 * Returns some data and a function with which a fetch can be called for a specific rule ID
 */
export const useFetchRuleId = (): [
	{ loading: boolean; rule: Rule | null; error: Error | null },
	(id: string) => void
] => {
	const [ruleId, setRuleId] = useState<string | null>(null)
	const [rule, setRule] = useState<Rule | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!ruleId) {
			setLoading(false), setError(null)
			setRule(null)
			return
		}
		const fetchReport = async () => {
			setLoading(true)
			setError(null)
			setRule(null)
			try {
				const rule = await FAGC.rules.fetchRule(ruleId)
				setRule(rule)
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

/**
 * Returns some data and a function with which a fetch can be called
 */
export const useAllFetchRules = (): [
	{ loading: boolean; rules: Rule[]; error: Error | null },
	() => void
] => {
	const [rules, setRules] = useState<Rule[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)
	const [shouldFetch, setShouldFetch] = useState(false)

	useEffect(() => {
		const fetchRules = async () => {
			setLoading(true)
			setError(null)
			setRules([])
			try {
				const rules = await FAGC.rules.fetchAll()
				setRules(rules)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		fetchRules()
	}, [shouldFetch])

	return [{ loading, rules, error }, () => setShouldFetch(!shouldFetch)]
}

export const useFetchRulesId = (): [
	{ loading: boolean; rules: Rule[]; error: Error | null },
	(ruleIDs: string[]) => void
] => {
	const [rules, setRules] = useState<Rule[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)
	const [ruleIDs, setRuleIDs] = useState<string[]>([])

	useEffect(() => {
		const fetchRules = async () => {
			setLoading(true)
			setError(null)
			setRules([])
			try {
				const rules = await Promise.all(
					ruleIDs.map((id) => FAGC.rules.fetchRule(id))
				).then((rules) => rules.filter((r) => r !== null) as Rule[])
				setRules(rules)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		fetchRules()
	}, [ruleIDs])

	return [
		{ loading, rules, error },
		(ruleIDs: string[]) => setRuleIDs(ruleIDs),
	]
}
