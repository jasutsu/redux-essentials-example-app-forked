import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
		postAdded(state, action: PayloadAction<Post>) {
			state.push(action.payload)
		}
	}
})

export const { postAdded } = postsSlice.actions
export default postsSlice.reducer