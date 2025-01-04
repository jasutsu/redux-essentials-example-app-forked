import { RootState } from "@/app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
	username: string | null
}

const initialState: AuthState = {
	username: '2' // null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		userLoggedIn(state, action: PayloadAction<string>) {
			state.username = action.payload
		},
		userLoggedOut(state) {
			state.username = null
		}
	},
})

export const selectCurrentUsername = (state: RootState) => state.auth.username

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer