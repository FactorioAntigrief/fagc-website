import { useEffect, useState } from "react"
import { User } from "fagc-api-types"
import { FAGC } from "../../FAGC"
import { useEffectOnce } from "react-use"

/**
 * Attempts to log in a user from cookies in cache
 */
export const useLogin = (): [
	{ loading: boolean; user: User | null; error: Error | null },
	() => void
] => {
	const [user, setUser] = useState<User | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)
	const [shouldFetch, setShouldFetch] = useState(false)

	useEffect(() => {
		const login = async () => {
			setLoading(true)
			setError(null)
			setUser(null)
			try {
				const user = await FAGC.users.login()
				setUser(user)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		login()
	}, [shouldFetch])

	return [{ loading, user, error }, () => setShouldFetch(!shouldFetch)]
}

/**
 * Get the signup URL (Discord OAuth2 link)
 */
export const useFetchSignupURL = (): [
	{ loading: boolean; url: string | null; error: Error | null }
] => {
	const [url, setURL] = useState<string | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	useEffectOnce(() => {
		const fetchURL = async () => {
			setLoading(true)
			setError(null)
			setURL(null)
			try {
				const url = await FAGC.users.getsignupurl()
				if (url) setURL(url)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		fetchURL()
	})

	return [{ loading, url, error }]
}

/**
 * Log the user in with the use of a Discord OAuth2 code
 */
export const useSignup = (): [
	{ loading: boolean; user: User | null; error: Error | null },
	(code: string, state: string) => void
] => {
	const [user, setUser] = useState<User | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)
	const [code, setCode] = useState("")
	const [state, setState] = useState("")

	useEffect(() => {
		const signup = async () => {
			setLoading(true)
			setError(null)
			setUser(null)
			try {
				const user = await FAGC.users.signup(code, state)
				setUser(user)
				setLoading(false)
			} catch (error) {
				setError(error as Error)
				setLoading(false)
			}
			return
		}
		if (code) signup()
	}, [code, state])

	return [
		{ loading, user, error },
		(code: string, state: string) => {
			setCode(code), setState(state)
		},
	]
}
