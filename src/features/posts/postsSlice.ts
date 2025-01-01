import { RootState } from "@/app/store"
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { sub } from "date-fns"
import { userLoggedOut } from "../auth/authSlice"
import { createAppAsyncThunk } from "@/app/withTypes"
import { client } from "@/api/client"

export interface Reactions {
	thumbsUp: number
	tada: number
	heart: number
	rocket: number
	eyes: number
}

export type ReactionName = keyof Reactions

export interface Post {
	id: string
	title: string
	content: string
	user: string
	date: string
	reactions: Reactions
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initalReactions: Reactions = {
	thumbsUp: 0,
	tada: 0,
	heart: 0,
	rocket: 0,
	eyes: 0,
}

interface PostsState {
	posts: Post[]
	status: 'idle' | 'pending' | 'success' | 'failed'
	error: string | null
}

export const fetchPosts = createAppAsyncThunk(
	'posts/fetchPosts',
	async () => {
		const response = await client.get<Post[]>('/fakeApi/posts')
		return response.data
	},
	{
		condition(arg, thunkApi) {
			const postsStatus = selectPostsStatus(thunkApi.getState())
			if(postsStatus !== "idle") {
				return false
			}
		}
	}
)

const initialState: PostsState = {
	posts: [],
	status: 'idle',
	error: null
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			prepare(title: string, content: string, userId: string): { payload: Post } {
				return {
					payload: {
						id: nanoid(),
						user: userId,
						date: new Date().toISOString(),
						reactions: initalReactions,
						title, content,
					}
				}
			},
			reducer(state, action: PayloadAction<Post>) {
				state.posts.push(action.payload)
			},
		},
		postUpdated(state, action: PayloadAction<PostUpdate>) {
			const { id, title, content } = action.payload
			const existingPost = state.posts.find(post => post.id === id)
			if (existingPost) {
				existingPost.title = title
				existingPost.content = content
			}
		},
		reactionAdded(
			state,
			action: PayloadAction<{ postId: string, reaction: ReactionName }>
		) {
			const { postId, reaction } = action.payload
			const existingPost = state.posts.find((post) => post.id === postId)
			if (existingPost) {
				existingPost.reactions[reaction] += 1
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLoggedOut, (state) => {
				return initialState
			})
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "pending"
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "success"
				state.posts.push(...action.payload)
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message ?? "Error on posts fetch request"
			})
	},
	selectors: {
		selectAllPosts: (state) => state.posts,
		selectPostById: (state, postId: string) => (
			state.posts.find((post) => post.id === postId)
		),
		selectPostsStatus: (state) => state.status
	}
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export const { selectAllPosts, selectPostById, selectPostsStatus } = postsSlice.selectors

export default postsSlice.reducer