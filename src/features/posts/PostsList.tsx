import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Link } from "react-router-dom"
import { fetchPosts, Post, selectAllPosts, selectPostsError, selectPostsStatus } from "./postsSlice"
import { PostMetaData } from "./PostMetaData"
import React, { useEffect } from "react"
import { Spinner } from "@/components/Spinner"

interface PostsExcerptProps {
	post: Post
}

const PostsExcerpt = ({ post }: PostsExcerptProps) => {
	return (
		<article className="post-excerpt">
			<h3>
				<Link to={`posts/${post.id}`}>{post.title}</Link>
			</h3>
			<p className="post-content">{post.content.substring(0, 100)}</p>
			<PostMetaData post={post} />
		</article>
	)
}

export const PostsList = () => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector(selectAllPosts)
	const postsStatus = useAppSelector(selectPostsStatus)
	const postsError = useAppSelector(selectPostsError)

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts())
		}
	}, [postsStatus, dispatch])

	let content: React.ReactNode

	if (postsStatus === "pending") {
		content = <Spinner text="Loading..." />
	} else if (postsStatus === "success") {
		const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
		content = orderedPosts.map((post) => (
			<PostsExcerpt post={post} key={post.id} />
		))
	} else if (postsStatus === "failed") {
		content = <div>{postsError}</div>
	}


	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{content}
		</section>
	)
}