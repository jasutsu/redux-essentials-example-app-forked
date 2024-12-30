import { useAppDispatch } from "@/app/hooks"
import { Post, reactionAdded, ReactionName } from "./postsSlice"

const reactionEmoji: Record<ReactionName, string> = {
	thumbsUp: '👍',
	tada: '🎉',
	heart: '❤️',
	rocket: '🚀',
	eyes: '👀'
}

interface ReactionButtonsProps {
	post: Post
}

export const ReactionButtons = ({post}: ReactionButtonsProps) => {
	const dispatch = useAppDispatch()

	const reactionButtons = Object.entries(reactionEmoji).map(
		([emojiName, emojiValue]) => {
			const reaction = emojiName as ReactionName
			return (
				<button
					key={reaction}
					className="muted-button reaction-button"
					onClick={() => dispatch(reactionAdded({postId: post.id, reaction}))}
				>
					{emojiValue} {post.reactions[reaction]}
				</button>
			)
		}
	)

	return <div>{reactionButtons}</div>
}