import { useRef } from 'react'

import { useClickOutside } from '../../costumeHooks/useClickOutside'


export function UserMenu({ user, onLogout, closeUserMenu }) {
	const modalRef = useRef()
	useClickOutside(modalRef, closeUserMenu)

	return (
		<section className="user-menu" ref={modalRef}>
			<div className="user-menu-header">
				<h2>Account</h2>
				<button className="btn-user-menu close" onClick={closeUserMenu}>
				<i className="fa-solid fa-x"></i>
				</button>
			</div>

			<div className="user-menu-content">
				<div className="user-menu-preview">
					<div className="user-img">
						<img src={user.imgUrl} alt="" style={{ borderRadius: '50%' }} />
					</div>
					<div className="user-name">{user.fullname}</div>
				</div>
				<hr className="user-menu-separator" />
				<a className="user-menu-logout" onClick={onLogout}>
					Logout
				</a>
			</div>
		</section>
	)
}