import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { userLoggedOut } from '@/features/auth/authSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from './UserIcon'

export const Navbar = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectCurrentUser)

	const isLoggedIn: boolean = !!user

	let navContent: React.ReactNode = null

	if(isLoggedIn) {
		const OnLogoutClicked = () => {
			dispatch(userLoggedOut())
		}

		navContent = (
			<div>
				<div className="navContent">
					<div className="navLinks">
						<Link to={'/'}>Posts</Link>
						<Link to={'/users'}>Users</Link>
					</div>
					<div className="userDetails">
						<UserIcon size={32} />
						{user?.name}
						<button
							className='button small'
							onClick={OnLogoutClicked}
						>
							Log Out
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<nav>
			<section>
				<h1>Redux Essentials Example</h1>
				{navContent}
			</section>
		</nav>
	)
}
