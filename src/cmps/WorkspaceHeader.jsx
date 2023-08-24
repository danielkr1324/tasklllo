import { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { BoardCreate } from './board/BoardCreate'
import { logout } from '../store/actions/user.actions'
import { UserMenu } from './board/UserMenu'
import { ReactComponent as TaskllloSvg } from '../assets/images/Tasklllo.svg'


export function WorkspaceHeader() {
	const [isBoardComposerOpen, setIsBoardComposerOpen] = useState(false)
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	const user = useSelector((storeState) => storeState.userModule.user)
	const navigate = useNavigate()
    const dispatch = useDispatch()
	const createBtn = useRef()
	const refDataBtn = createBtn

	function openBoardComposer() {
		setIsBoardComposerOpen(true)
	}
	function closeBoardComposer() {
		setIsBoardComposerOpen(false)
	}

	function openUserMenu() {
		setIsUserMenuOpen(true)
		console.log(user)
	}
	function closeUserMenu() {
		setIsUserMenuOpen(false)
	}

	function onLogout() {
		dispatch(logout())
		navigate(`/`)
	}

	return (
		<header className="workspace-header">
			<div className="logo-nav">
				

				<NavLink to="/" className="header-logo">
					<TaskllloSvg />
					<h1 className="tasklllo-logo">Tasklllo</h1>
				</NavLink>

				<NavLink to="/workspace">
					<button className="nav-btn">
						Boards 
						
					</button>
				</NavLink>

				

				<button className="nav-btn">
					Starred 
					
				</button>

				<button
					className="create-btn"
					onClick={openBoardComposer}
					ref={createBtn}
				>
					Create
					
				</button>
			</div>

			<div className="left-nav">
				

				{user && (
					<button className="btn-member-img" onClick={openUserMenu}>
						<img
							className="member-img"
							src={user.imgUrl}
							alt={user.fullname}
							style={{ borderRadius: '50%' }}
						/>
					</button>
				)}
			</div>
			{isBoardComposerOpen && (
				<BoardCreate
					closeBoardComposer={closeBoardComposer}
					refDataBtn={refDataBtn}
				/>
			)}
			{user && isUserMenuOpen && (
				<UserMenu
					user={user}
					onLogout={onLogout}
					closeUserMenu={closeUserMenu}
				/>
			)}
		</header>
	)
}