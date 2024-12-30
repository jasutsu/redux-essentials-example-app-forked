import { RootState } from "@/app/store"
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { sub } from "date-fns"

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

const initialState: Post[] = [
	{
		id: '1', title: 'First Post', content:
			`
		Hello API, Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Iste praesentium, nihil ipsa possimus veniam totam suscipit eveniet, 
		consequatur harum quae hic, eum laudantium culpa odit explicabo sequi 
		officia magnam atque molestiae? Harum consectetur nobis provident 
		iure eaque debitis eligendi dolores magni hic accusantium neque odit 
		eum, facilis earum laborum unde.
		`,
		user: '0',
		date: sub(new Date, { minutes: 10 }).toISOString(),
		reactions: initalReactions,
	},
	{
		id: '2', title: 'Second Post!', content:
			`
		Harum consectetur nobis provident iure eaque debitis eligendi Hello
		API, Lorem ipsum dolor sit amet consectetur adipisicing elit. 
		Iste praesentium, nihil ipsa possimus veniam totam suscipit eveniet, 
		consequatur harum quae hic, eum laudantium culpa odit explicabo sequi 
		officia magnam atque molestiae? dolores magni hic accusantium neque odit 
		eum, facilis earum laborum unde.
		`,
		user: '2',
		date: sub(new Date, { minutes: 5 }).toISOString(),
		reactions: initalReactions,
	},
]

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
				state.push(action.payload)
			},
		},
		postUpdated(state, action: PayloadAction<PostUpdate>) {
			const { id, title, content } = action.payload
			const existingPost = state.find(post => post.id === id)
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
			const existingPost = state.find((post) => post.id === postId)
			if (existingPost) {
				existingPost.reactions[reaction] += 1
			}
		}
	},
	selectors: {
		selectAllPosts: (postsState) => postsState,
		selectPostById: (postsState, postId: string) => (
			postsState.find((post) => post.id === postId)
		)
	}
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export const { selectAllPosts, selectPostById } = postsSlice.selectors

export default postsSlice.reducer