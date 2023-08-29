import { useNavigate, useParams } from 'react-router';
import { utilService } from '../../services/util.service';
import { useSelector } from 'react-redux';

export function TaskPreview({ task, groupId, labels, onSaveTask }) {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { members } = useSelector(storeState => storeState.boardModule.board)

  const taskLabels = task.labelIds ? labels.filter(label => task.labelIds.includes(label.id)) : [];
  const taskMembers = task.memberIds ? members.filter(member => task.memberIds.includes(member._id)) : []

  const editTask = () => {
    navigate(`/board/${boardId}/${groupId}/${task.id}`);
  };

  let totalTodos
	let todosStyle
	getTotalTodos()

	function getTotalTodos() {
		const checklistLength = task.checklists.map(currChecklist => {
			return currChecklist.todos.length
		})
		let length = checklistLength.reduce((acc, num) => {
			return acc + num
		}, 0)

		let counter = 0
		task.checklists.map(checklist => {
			return checklist.todos.map(todo => {
				if (todo.isDone) counter++
			})
		})

		totalTodos = counter + '/' + length

		if (counter === length) todosStyle = 'done'
		else todosStyle = ''

		return {
			totalTodos, todosStyle
		}
	}

  function onToggleDateDone(ev) {
		ev.stopPropagation()
		task.isDone = !task.isDone
		onSaveTask(task, groupId)
	}

  function getDueWarnSpan(task) {
		if (task?.isDone) return 'done'

		const taskDueDate = new Date(task.dueDate)
		const now = new Date()

		const msBetweenDates = taskDueDate.getTime() - now.getTime()
		const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)

		if (hoursBetweenDates < 0) return ' overdue'
		if (hoursBetweenDates < 24) return 'due-sticker soon'
	}

  return (
    <article className="task-preview hover-dark" onClick={editTask}>
      <div onClick={editTask}>
        {task.style && <div className='cover' style={task.style}></div>}
        <div className="task-content">
          {taskLabels.length > 0 &&
            <ul className='task-preview-labels clean-list'>
              {taskLabels.map(label => (
                <li key={label.id} className='task-preview-label' style={{ backgroundColor: `${label.color}` }}></li>
              ))}
            </ul>}
          <p className="task-title">{task.title}</p>

          <div className='task-icons'>
            {task.description && <i title='Description' className="fa-solid fa-align-left"></i>}
            {task.checklists.length > 0 && task.checklists[0].todos.length > 0 && 
              <div title='Checklist items' className={todosStyle}> <i className="fa-regular fa-square-check"></i> 
              <span>{totalTodos}</span> </div>}

			{task.dueDate && (
				<div title='Due date' className={getDueWarnSpan(task)}
					onClick={(ev) => onToggleDateDone(ev, task)}>
					<span className='task-preview-actions-icons date'>
						<i className="fa-regular fa-clock"></i>
							{utilService.dueDateFormat(task.dueDate)}
						</span>
				</div>
			)}
				
            {taskMembers && taskMembers.length > 0 && (
				<ul className='task-preview-members clean-list'>
					{taskMembers.map(m => (
						<li key={m._id} className='member-img'>
							<img src={m.imgUrl} title={m.username} />
						</li>
					))}
				</ul>
			) }
          </div>
        </div>
      </div>
    </article>
  );
}