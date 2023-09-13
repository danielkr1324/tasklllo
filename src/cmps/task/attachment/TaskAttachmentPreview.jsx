import { TaskAttachment } from './TaskAttachment'


export function TaskAttachmentPreview({ task, submitTaskEdit}) {
    const { attachments } = task

    function onDeleteAttachment(ev, attachmentId) {
        ev.stopPropagation()
        ev.preventDefault()

        const updateAttachments = attachments.filter(att => (att.id !== attachmentId))
        const newTask = { ...task, attachments: updateAttachments }
        submitTaskEdit( newTask)
    }

    return ( 
        <section className='task-attachments-section full'>
            <div className="task-attachments-header">
                <div className='title-in-task'>
                    <i className="fa-solid fa-paperclip"></i>
                    <h2 className=''>Attachments</h2>
                </div>
            </div>
            {task.attachments.map((attachment) => {
                return <div className='task-attachment-container' key={attachment.id}>
                    <TaskAttachment task={task} attachment={attachment} submitTaskEdit={submitTaskEdit} onDeleteAttachment={onDeleteAttachment} />
                </div>
            })}
        </section>
    )
}