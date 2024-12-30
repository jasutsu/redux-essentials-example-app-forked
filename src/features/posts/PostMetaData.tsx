import { TimeAgo } from "@/components/TimeAgo"
import { PostAuthor } from "./PostAuthor"
import { Post } from "./postsSlice"
import { ReactionButtons } from "./ReactionButtons"

interface PostMetaDataProps {
	post: Post
}

export const PostMetaData = ({ post }: PostMetaDataProps) => (
	<>
		<PostAuthor userId={post.user} />
		<TimeAgo timestamp={post.date} />
		<ReactionButtons post={post} />
	</>
)