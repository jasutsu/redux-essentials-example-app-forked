import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { PostsMainPage } from './features/posts/PostsMainPage'

function App() {
	return (
		<Router>
			<Navbar />
			<div className="App">
				<Routes>
					<Route path="/" element={<PostsMainPage />} />
					<Route path="/posts/:postId" element={<SinglePostPage />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
