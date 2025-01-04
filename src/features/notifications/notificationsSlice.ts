import { client } from "@/api/client"
import { createAppAsyncThunk } from "@/app/withTypes"
import { createSlice } from "@reduxjs/toolkit"

export interface ServerNotification {
	id: string
	date: string
	message: string
	user: string
}

export const fetchNotifications = createAppAsyncThunk(
	'notifications/fetchNotifications',
	async (arg, thunkApi) => {
		const [latestNotification] = selectAllNotifications(thunkApi.getState())
		const latestTimestamp = latestNotification ? latestNotification.date : ''
		const response = await client.get<ServerNotification[]>(
			`/fakeApi/notifications/since=${latestTimestamp}`
		)
		return response.data
	}
)

const initialState: ServerNotification[] = []

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.push(...action.payload)
				state.sort((a, b) => b.date.localeCompare(a.date))
			})
	},
	selectors: {
		selectAllNotifications: (state) => state
	}
})

export const { selectAllNotifications } = notificationsSlice.selectors

export default notificationsSlice.reducer