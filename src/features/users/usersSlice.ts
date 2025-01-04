import { createSlice } from "@reduxjs/toolkit"
import { selectCurrentUsername } from "../auth/authSlice"
import { RootState } from "@/app/store"
import { createAppAsyncThunk } from "@/app/withTypes"
import { client } from "@/api/client"

interface User {
	id: string
	name: string
}

export const fetchUsers = createAppAsyncThunk(
	'users/fetchUsers',
	async () => {
		const response = await client.get<User[]>('/fakeApi/users')
		return response.data
	}
)

const initialState: User[] = []

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				return action.payload
			})
	},
	selectors: {
		selectAllUsers: (usersState) => usersState,
		selectUserById: (usersState, userId: string | null) => (
			usersState.find((user) => user.id === userId)
		),
	}
})

export const { selectAllUsers, selectUserById } = usersSlice.selectors
export const selectCurrentUser = (state: RootState) => {
	const currentUsername = selectCurrentUsername(state)
	return state.users[0]
	// return selectUserById(state, currentUsername)
}

export default usersSlice.reducer