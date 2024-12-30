import { useAppSelector } from "@/app/hooks"
import { selectUserById } from "../users/usersSlice"

interface PostAuthorProps {
	userId: string
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
	const author = useAppSelector((state) => selectUserById(state, userId))

	return <p>by { author?.name ?? "Unknown Author" }</p>
}