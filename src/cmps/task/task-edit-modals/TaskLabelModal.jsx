import { useState } from "react"

export function TaskLabelModal({ task, submitTaskEdit, labels, boardLabelsUpdate }) {
    const [labelToEdit, setLabelToEdit] = useState({})
    const [labelsToRender, setLabelsToRender] = useState(labels)

    const editLabel = ({ target }) => {
        const { value, name: field } = target;
        setLabelToEdit((prevLabel) => ({ ...prevLabel, [field]: value }));
    };

    const updateLabels = async (e) => {
        e.preventDefault()
        const newLabels = labels.map(label => label.id === labelToEdit.id ? labelToEdit : label)
        await boardLabelsUpdate(newLabels)
        setLabelToEdit({})
        setLabelsToRender(newLabels)
    }

    const onToggleLabel = async (ev, id) => {
        ev.preventDefault()
        let updateLabelIds
        let updateTask


        //remove label from task
        if (task.labelIds?.includes(id)) {
            updateLabelIds = task.labelIds.filter(label => (label !== id))
            updateTask = { ...task, labelIds: updateLabelIds }

        } else {
            updateLabelIds = task.labelIds
            updateLabelIds.push(id)
            updateTask = { ...task, labelIds: updateLabelIds }
        }
        await submitTaskEdit(updateTask)
    }

    function handleChange({ target }) {
        const regex = new RegExp(target.value, 'i')
        const filteredLabels = labels.filter((label) => regex.test(label.title))
        setLabelsToRender(filteredLabels)
    }

    
    return (
        <div className="label-modal">
            <h3 className="dynamic-modal-title">Labels</h3>
            <input
                type="text"
                className='modal-search'
                name="txt"
                id="txt"
                placeholder="Search labels..."
                onChange={handleChange}
                autoFocus
                autoComplete="off"
            />
            <ul className="label-select clean-list">
                <h3 className="modal-sub-title">Labels</h3>
                {labelsToRender.map(label => (
                    <li key={label.id} className="label">
                        {labelToEdit && label.id !== labelToEdit.id  && 
                        <>
                            <input 
                                className="label-checkbox"
                                onChange={(ev) => onToggleLabel(ev, label.id)}
                                type="checkbox" 
                                checked={task?.labelIds.includes(label.id)}
                                id={label.id}
                                />
                            <label htmlFor={label.id} className="label-preview label" style={{ backgroundColor: `${label.color}`}}>
                                {label.title}
                            </label>
                            <button onClick={()=> setLabelToEdit(label)}><i className="fa-solid fa-pencil"></i></button>
                        </>
                        }
                        {labelToEdit && label.id === labelToEdit.id &&
                        <div className="label-edit-container">
                            <input 
                                style={{ backgroundColor: `${label.color}` }}
                                className="label-title-edit"
                                name="title"
                                onChange={(ev) => editLabel(ev)}
                                type="text" 
                                autoFocus
                                id={label.id}
                                defaultValue={label.title}
                            />
                            <button className="btn-save " onClick={e => updateLabels(e)}><i class="fa-solid fa-check"></i></button>
                        </div>}

                    </li>
                ))}
            </ul>
        </div>
    )
}
