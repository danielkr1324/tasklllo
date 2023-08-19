import { useSelector } from 'react-redux'
// import { ActivityLog } from './activity-log'

export function SideMenuMain({ onChangeTitle }) {

	return (
		<section className="side-menu-main">
			<button onClick={() => onChangeTitle('Change background')}>
				Change background
			</button>
				<hr className="side-menu-separator" />
		</section>
	)
}