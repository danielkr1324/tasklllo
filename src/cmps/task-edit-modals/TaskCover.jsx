export function TaskCover({task, onSaveTask, groupId}) {
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

    const setTaskCover = (coverColor) => {
        const updatedTask = JSON.parse(JSON.stringify(task))
        updatedTask.style.backgroundColor =  coverColor
        onSaveTask(updatedTask, groupId)
    }

    return (
        <div className="dynamic-modal task-cover">
            <div className="dynamic-modal-title">
                <p>Cover</p>
            </div>
            <div className="color-container">
                <h3>colors</h3>
                <ul className="color-pallette clean-list">
                    {coverColors.map(coverColor => (
                        <li key={coverColor} className={coverColor}>
                            <button
                                onClick={()=> setTaskCover(coverColor)}
                                className="btn-color"
                                style={{background: coverColor}}>
                            </button>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )

}
   
  