import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Link } from "react-router-dom"
import { fetchPosts, selectAllPosts, selectPostsStatus } from "./postsSlice"
import { PostMetaData } from "./PostMetaData"
import { useEffect } from "react"

export const PostsList = () => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector(selectAllPosts)
	const postsStatus = useAppSelector(selectPostsStatus)

	useEffect(() => {
		if(postsStatus === "idle") {
			dispatch(fetchPosts())
		}
	}, [postsStatus, dispatch])
	
	const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
	const renderedPosts = orderedPosts.map((post) => (
		<article className="post-excerpt" key={post.id}>
			<h3>
				<Link to={`posts/${post.id}`}>{post.title}</Link>
			</h3>
			<p className="post-content">{post.content.substring(0, 100)}</p>
			<PostMetaData post={post} />
		</article>
	))

	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	)
}