import { useRef } from "react"
import { useClickOutside } from "../../costumeHooks/useClickOutside"

import { TaskCoverModal } from "./task-edit-modals/TaskCoverModal"
import { TaskChecklistModal } from "./task-edit-modals/TaskChecklistModal"
import { TaskLabelModal } from "./task-edit-modals/TaskLabelModal"
import { TaskDateModal } from "./task-edit-modals/TaskDateModal"

export function DynamicModal({task, submitTaskEdit, sideBarModalType, setSideBarModalType, labels, boardLabelsUpdate}) {
    const ref = useRef(null)
    useClickOutside(ref, setSideBarModalType)
    
    return (
        <section ref={ref} className="dynamic-modal">
            {sideBarModalType === 'TaskCoverModal' &&
                <TaskCoverModal 
                task={task}
                submitTaskEdit={submitTaskEdit}
                />}

            {sideBarModalType === 'TaskChecklistModal' &&
                <TaskChecklistModal 
                task={task}
                submitTaskEdit={submitTaskEdit}
                />}

            {sideBarModalType === 'TaskLabelModal' &&
                <TaskLabelModal 
                task={task}
                submitTaskEdit={submitTaskEdit}
                labels={labels}
                boardLabelsUpdate={boardLabelsUpdate}
                />}

            {sideBarModalType === 'TaskDateModal' &&
                <TaskDateModal 
                task={task}
                submitTaskEdit={submitTaskEdit}
                />}
        </section>
    )
}