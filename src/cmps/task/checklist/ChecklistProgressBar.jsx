export function ChecklistBarProgress({ todos }) {

    
    const getUserProgress = () => {
        if (todos.length) {
            let doneTodos = todos.filter((todo) => todo.isDone === true)
            let toPercentage = Math.ceil((doneTodos.length / todos.length) * 100)
            
            return toPercentage
        }
    }
    
    let isComplete = (getUserProgress() === 100) ? 'isComplete' : ''
    
    return <section className='todos-prog-bar-section'>

        <span className='todos-prog-bar-percentage'>{getUserProgress() || 0}%</span>
        <div className='todos-prog-bar-background'>
            {(getUserProgress() > 0) && <div
                className={`prog-accomplished ${isComplete}`}
                style={{
                    width: `${getUserProgress()}%`,
                }}></div>}
        </div>
    </section>
}