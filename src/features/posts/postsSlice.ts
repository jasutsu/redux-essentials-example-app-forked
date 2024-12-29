import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"

export interface Post {
	id: string
	title: string
	content: string
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
		`
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
		`
	},
]

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			prepare(title: string, content: string) {
				return {
					payload: {id: nanoid(), title, content}
				}
			},
			reducer(state, action: PayloadAction<Post>) {
				state.push(action.payload)
			},
		},
		postUpdated(state, action: PayloadAction<Post>) {
			const { id, title, content } = action.payload
			const existingPost = state.find(post => post.id === id)
			if(existingPost) {
				existingPost.title = title
				existingPost.content = content
			}
		}
	}
})

export const { postAdded, postUpdated } = postsSlice.actions
export default postsSlice.reducer