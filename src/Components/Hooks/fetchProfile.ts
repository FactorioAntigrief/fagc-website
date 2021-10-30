import { useEffect, useState } from "react"
import { Profile } from "fagc-api-types"
import { FAGC } from "../../FAGC"

const useFetchCommunityProfile = (): [
	{ loading: boolean; profile: Profile[]; error: Error | null },
	(playername: string, communityId?: string) => void
] => {
	const [playername, setPlayername] = useState<string | null>(null)
	const [communityId, setCommunityId] = useState<string | undefined>(
		undefined
	)
	const [profile, setProfile] = useState<Profile[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// this wont happen but whatever
		if (!playername) return
		console.log(playername, communityId, "alek")
		const fetchReport = async () => {
			setLoading(true)
			setError(null)
			setProfile([])
			try {
				const profile = await (communityId
					? FAGC.profiles.fetchCommunity(playername, communityId)
					: FAGC.profiles.fetchAll(playername))
				setProfile(Array.isArray(profile) ? profile : [profile])
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
		{ loading, profile, error },
		(playername: string, communityId?: string) => {
			setPlayername(playername)
			setCommunityId(communityId)
		},
	]
}
export default useFetchCommunityProfile
