import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "fagc-api-types"

interface UserState {
	discordUserId?: string
	discordUserTag?: string
	user?: User
	discordGuildIds: string[]
}

const initialState: UserState = {
	discordGuildIds: [],
}
export const GlobalSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<{ user: User }>) => {
			state = {
				...state,
				user: action.payload.user,
				discordUserId: action.payload.user.discordUserId,
				discordUserTag: action.payload.user.discordUserTag,
				discordGuildIds: action.payload.user.discordGuildIds,
			}
			return state
		},
	},
})

export const { setUser } = GlobalSlice.actions
export default GlobalSlice.reducer
