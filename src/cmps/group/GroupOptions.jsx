import { useClickOutside } from "../../costumeHooks/useClickOutside"
import { useRef } from "react"

export function GroupOptions({group, toggleGroupOptions, onRemoveGroup, onDuplicateGroup}) {

    const ref = useRef(null)
    useClickOutside(ref, toggleGroupOptions)

    const duplicateGroup = (group) => {
        toggleGroupOptions(group.id)
        onDuplicateGroup(group)
    }
    
    return (

        <div ref={ref}  className="group-options">
            <div  className="group-options-container">
                <div  className="group-options-top">
                    <button onClick={() => toggleGroupOptions( group.id)}>x</button>
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