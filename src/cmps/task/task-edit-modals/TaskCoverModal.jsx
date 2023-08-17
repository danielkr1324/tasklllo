
export function TaskCoverModal({task, submitTaskEdit}) {
    const coverColors = [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D'
    ]

    const setTaskCoverModal = (coverColor) => {
        task['style'] = {backgroundColor: coverColor} 
        submitTaskEdit(task)
    }

    const removeCover = () => {
        delete task.style
        submitTaskEdit(task)
    }

    return (
        <div  className=" task-cover">
            <h3 className="dynamic-modal-title">Cover</h3>
            <div className="color-container">
                <h3>colors</h3>
                <ul className="color-pallette clean-list">
                    {coverColors.map(coverColor => (
                        <li key={coverColor} className={coverColor}>
                            <button
                                onClick={()=> setTaskCoverModal(coverColor)}
                                className="btn-color"
                                style={{background: coverColor}}>
                            </button>
                        </li>
                    ))}
                </ul>
                {task.style && 
                    <button onClick={removeCover}>Remove cover</button>
                }
            </div>
        </div>
    )

}
   
  