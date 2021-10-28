import { useEffect, useState } from "react"
import { Community } from "fagc-api-types"
import { FAGC } from "../../FAGC"

const useFetchCommunity = (): [
	{ loading: boolean; community: Community | null; error: Error | null },
	(id: string) => void
] => {
	const [communityId, setCommunityId] = useState<string | null>(null)
	const [community, setCommunity] = useState<Community | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!communityId) {
			setLoading(false), setError(null)
			setCommunity(null)
			return
		}
		const fetchReport = async () => {
			setLoading(true)
			setError(null)
			setCommunity(null)
			try {
				const community = await FAGC.communities.fetchCommunity(
					communityId
				)
				setCommunity(community)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		fetchReport()
	}, [communityId])

	return [{ loading, community, error }, setCommunityId]
}
export default useFetchCommunity
