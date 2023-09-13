import { useRef } from "react"
import { useClickOutside } from "../../costumeHooks/useClickOutside"

export function UserDropdown({filteredUsers, onSetUserName, closeUserDropdown}) {
    const ref = useRef()
    useClickOutside(ref, closeUserDropdown);
    return(
        <ul ref={ref} className="user-dropdown clean-list">
            {filteredUsers.map(user => (
                <li onClick={()=> onSetUserName(user.username)} className="user-dropdown-preview" key={user._id}>
                    <img className="user-img" src={user.imgUrl} alt={user.username} />
                    <p>{user.username}</p>
                </li>
            ))}
        </ul>
    )
}
