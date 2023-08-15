import { useState } from "react"

export function TaskLabelModal({ task, submitTaskEdit, labels, boardLabelsUpdate }) {
    const [labelToEdit, setLabelToEdit] = useState({})

    const editLabel = ({ target }) => {
        const { value, name: field } = target;
        setLabelToEdit((prevLabel) => ({ ...prevLabel, [field]: value }));
    };

    const updateLabels = async (e) => {
        e.preventDefault()
        const newLabels = labels.map(label => label.id === labelToEdit.id ? labelToEdit : label)
        await boardLabelsUpdate(newLabels)
        setLabelToEdit({})
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
        submitTaskEdit(updateTask)
    }

    
    return (
        <div className="label-modal">
            <h2 className="dynamic-modal-title">Labels</h2>
            <ul className="label-select clean-list">
                {labels.map(label => (
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
                            <label htmlFor={label.id} className="label-preview label" style={{ backgroundColor: `${label.color}` }}>
                                {label.title}
                            </label>
                            <button onClick={()=> setLabelToEdit(label)}>edit</button>
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
                            <button className="btn-save " onClick={e => updateLabels(e)}>done</button>
                        </div>}

                    </li>
                ))}
            </ul>
        </div>
    )
}
