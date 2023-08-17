import { utilService } from "../../../services/util.service";

export function TaskDueDate({ task, submitTaskEdit, setSideBarModalType }) {
  const taskDueDateTime = utilService.dueDateTimeFormat(task.dueDate);
  const updateTask = { ...task };

  const onChangeTaskDone = async (ev) => {
    updateTask.isDone = !updateTask.isDone;
    await submitTaskEdit(updateTask);
  };

  const getDueWarnSpan = (task) => {
    if (task.isDone) {
      return <span className="due-sticker completed">completed</span>;
    }

    const taskDueDate = new Date(task.dueDate);
    const now = new Date();
    const msBetweenDates = taskDueDate.getTime() - now.getTime();
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    if (hoursBetweenDates < 0) {
      return <span className="due-sticker overdue">overdue</span>;
    }
    if (hoursBetweenDates < 24) {
      return <span className="due-sticker soon">due soon</span>;
    }
  };

  return (
    <li className='task-due-date-section clean-list'>
      <h3 className='small-headline'>Due date</h3>
      <div className='task-due-date-container'>
        <input
          onChange={onChangeTaskDone}
          checked={task.isDone}
          className="task-due-date-checkbox"
          type="checkbox"
          id={task.id}
        />
        <button className='clean-btn task-due-date-show' onClick={() => setSideBarModalType('TaskDateModal')}>
          <span className='task-due-date-span'>{taskDueDateTime} {getDueWarnSpan(updateTask)}</span>
        </button>
      </div>
    </li>
  );
}


