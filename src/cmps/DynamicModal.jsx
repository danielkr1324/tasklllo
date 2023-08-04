import { useRef } from "react"
import { useClickOutside } from "../costumeHooks/useClickOutside"

import { TaskCover } from "./task-edit-modals/TaskCover.jsx"

export function DynamicModal({task, submitTaskEdit, sideBarModalType, setSideBarModalType}) {

    const ref = useRef(null)
    useClickOutside(ref, setSideBarModalType)

    return (
        <section ref={ref} className="dynamic-modal">
            {sideBarModalType === 'TaskCover' &&
            <TaskCover 
            task={task}
            submitTaskEdit={submitTaskEdit}
            setSideBarModalType={setSideBarModalType}/>}

        </section>
    )

}