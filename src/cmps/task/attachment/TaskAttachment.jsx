import { utilService } from '../../../services/util.service'


export function TaskAttachment({ task, attachment, submitTaskEdit, onDeleteAttachment }) {

    function onToggleTaskCover() {
        let updateTask = { ...task }
        
        if (!updateTask.style) updateTask.style = {}

        let taskStyle = updateTask.style

        if (taskStyle) {
            if (taskStyle.background) {
                delete updateTask.style

            } else {
                taskStyle.background = `${utilService.getRandomImgBgColor()} url("${attachment.url}") center center / contain no-repeat`
                taskStyle.color = false
            }
        } else {
            taskStyle = { background: `${utilService.getRandomImgBgColor()} url("${attachment.url}") center center / contain no-repeat` , color: false}
        }
        submitTaskEdit( updateTask)
    }

    return (
        <>
            <div className="task-attachment-preview-img-container">

                <a href={attachment.url}
                    target={'_blank'}
                    rel="noreferrer"
                > 
                <img className="task-attachment-preview-img" src={attachment.url} alt='attachment-img'></img></a>
            </div>

            <section className="attachment-details">
                <section className="attachment-name-and-options">
                    <p className="attachment-name ">{attachment.title}</p>
                    <p className="attachment-detail-p">Added {utilService.timeSince(attachment.createdAt)} |
                    <span className="attachment-remove" onClick={(ev) => onDeleteAttachment(ev, attachment.id)}>
                        Delete
                    </span></p>
                    
                </section>

                <div className="make-attachment-cover" onClick={onToggleTaskCover} >
                        <p className="make-attachment-cover-p">Make cover</p>
                </div>
            </section>
        </>
    )
}