import React ,{useState} from 'react';
import { TaskEdit } from './TaskEdit';

export function TaskPreview({task, onSaveTask, groupId}) {
  const [isEditTask, setIsEditTask] = useState(false);

  const toggleIsEditTask = () => {
    setIsEditTask(!isEditTask);
  }

  return (
    <article className="task-preview hover-dark">
      <div onClick={toggleIsEditTask}>
      {task.style && <div className='cover' style={task.style}></div>}
        <div className="task-content ">
          <p className="task-title ">{task.title}</p>
        </div>
      </div>

      {isEditTask && <TaskEdit 
        task={task}
        onSaveTask={onSaveTask} 
        groupId={groupId} />}
    </article>
  );
}