import { useSelector } from 'react-redux'

export function SideMenuMain({ onChangeTitle, isAdmin, onRemoveBoard }) {
	return (
		<section className="side-menu-main">
			<button onClick={() => onChangeTitle('Change background')}>
				Change background
			</button>
			<hr className="side-menu-separator" />
			{isAdmin && (
				<>
					<button onClick={onRemoveBoard}>
						Delete this board
					</button>
					<hr className="side-menu-separator" />
				</>
			)
			}
		</section>
	)
}