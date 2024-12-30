import { RootState } from "@/app/store"
import { createSlice } from "@reduxjs/toolkit"

interface User {
	id: string
	name: string
}

const initialState: User[] = [
	{ id: '0', name: 'Pavan Kumar' },
	{ id: '1', name: 'Tina Mirza' },
	{ id: '2', name: 'Kat Dickson' },
]

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	selectors: {
		selectAllUsers: (usersState) => usersState,
		selectUserById: (usersState, userId: string | null) => (
			usersState.find((user) => user.id === userId)
		)
	}
})

export const { selectAllUsers, selectUserById } = usersSlice.selectors

export default usersSlice.reducer