import { useState } from "react"
import { TaskCover } from "./task-edit-modals/TaskCover"

export function TaskEdit({task, onSaveTask, groupId}) {
    const [SideBarModalType, setSideBarModalType] = useState('')

    

    return (
       <div className="task-edit">
            <div className="modal-content">
            {task.style && <div className='cover' style={task.style}></div>}
                <input type="text" defaultValue={task.title}/>
                    <main className="modal-edit">
                        <div className="task-main">
                            <h2>Description</h2>
                            <textarea defaultValue={task.description} placeholder="Add a more detailed description..."/>
                        </div>

                        <div className="modal-sidebar">
                            <button onClick={() => setSideBarModalType('TaskCover')}>cover</button>
                        </div>
                    </main>
            </div>

            {SideBarModalType &&
                 <TaskCover 
                  task={task}
                  onSaveTask={onSaveTask}
                  groupId={groupId} />}
       </div>
    )
}