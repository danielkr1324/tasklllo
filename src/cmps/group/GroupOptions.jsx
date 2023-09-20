import { useClickOutside } from "../../costumeHooks/useClickOutside"
import { useRef } from "react"

export function GroupOptions({group, closeGroupOpt, onRemoveGroup, onDuplicateGroup}) {

    const ref = useRef(null)
    useClickOutside(ref, closeGroupOpt)

    const duplicateGroup = (group) => {
        closeGroupOpt(group.id)
        onDuplicateGroup(group)
    }
    
    
    return (

        <div ref={ref}  className="group-options">
            <div  className="group-options-container">
                <div  className="group-options-top">
                    <button onClick={() => closeGroupOpt( group.id)}>x</button>
                    <p>List actions</p>
                    <hr />
                </div>
            <ul className="options-select clean-list">
                <li onClick={() => duplicateGroup(group)} className="hover-dark">Copy list...</li>
                <li onClick={() => onRemoveGroup(group.id)} className="hover-dark">Delete list...</li>
            </ul>
            </div>
        </div>
    )

}