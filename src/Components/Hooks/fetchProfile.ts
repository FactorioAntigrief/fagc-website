import { useEffect, useState } from "react"
import { Profile } from "fagc-api-types"
import { FAGC } from "../../FAGC"

const useFetchCommunityProfile = (): [
	{ loading: boolean; profiles: Profile[]; error: Error | null },
	(playername?: string, communityId?: string) => void
] => {
	const [playername, setPlayername] = useState<string | undefined>(undefined)
	const [communityId, setCommunityId] = useState<string | undefined>(
		undefined
	)
	const [profiles, setProfiles] = useState<Profile[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!playername) return setProfiles([])
		const fetchReport = async () => {
			setLoading(true)
			setError(null)
			setProfiles([])
			try {
				const profile = await (communityId
					? FAGC.profiles.fetchCommunity(playername, communityId)
					: FAGC.profiles.fetchAll(playername))
				setProfiles(Array.isArray(profile) ? profile : [profile])
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		fetchReport()
	}, [playername, communityId])

	return [
		{ loading, profiles, error },
		(playername?: string, communityId?: string) => {
			setPlayername(playername)
			setCommunityId(communityId)
		},
	]
}
export default useFetchCommunityProfile
