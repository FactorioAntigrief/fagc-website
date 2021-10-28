import { useEffect, useState } from "react"
import { Profile } from "fagc-api-types"
import { FAGC } from "../../FAGC"

const useFetchCommunityProfile = (): [
	{ loading: boolean; profile: Profile | null; error: Error | null },
	(playername: string, communityId: string) => void
] => {
	const [playername, setPlayername] = useState<string | null>(null)
	const [communityId, setCommunityId] = useState<string | null>(null)
	const [profile, setProfile] = useState<Profile | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// this wont happen but whatever
		if (!playername || !communityId) return
		const fetchReport = async () => {
			setLoading(true)
			setError(null)
			setProfile(null)
			try {
				const report = await FAGC.profiles.fetchCommunity(
					playername,
					communityId
				)
				setProfile(report)
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
		(playername: string, communityId: string) => {
			setPlayername(playername)
			setCommunityId(communityId)
		},
	]
}
export default useFetchCommunityProfile
