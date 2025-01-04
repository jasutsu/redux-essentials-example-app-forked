import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { PostsMainPage } from './features/posts/PostsMainPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'

function App() {
	return (
		<Router>
			<Navbar />
			<div className="App">
				<Routes>
					<Route path="/" element={<PostsMainPage />} />
					<Route path="/posts/:postId" element={<SinglePostPage />} />
					<Route path='/editPost/:postId' element={<EditPostForm />} />
					<Route path='/users' element={<UsersList />} />
					<Route path='/usersList/:userId' element={<UserPage />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
