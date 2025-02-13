import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { userLoggedOut } from "../auth/authSlice"
import { createAppAsyncThunk } from "@/app/withTypes"
import { client } from "@/api/client"
import { RootState } from "@/app/store"

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
type NewPost = Pick<Post, 'title' | 'content' | 'user'>

export const addNewPost = createAppAsyncThunk(
	'posts/addNewPost',
	async (initialPost: NewPost) => {
		const response = await client.post<Post>('/fakeApi/posts', initialPost)
		console.log('tried adding new post')
		return response.data
	}
)

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
			if (postsStatus !== "idle") {
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
			.addCase(addNewPost.fulfilled, (state, action) => {
				state.posts.push(action.payload)
			})
	},
})

export const selectAllPosts = (state: RootState) => state.posts.posts
export const selectPostById = (state: RootState, postId: string) => (
	state.posts.posts.find((post) => post.id === postId)
)
export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error
export const selectPostsByUser = (state: RootState, userId: string) => {
	const allPosts = selectAllPosts(state)
	return allPosts.filter((post) => post.user === userId)
}

export const { postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer