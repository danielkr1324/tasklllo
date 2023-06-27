import React ,{useState, useRef} from 'react';
import { useNavigate, useParams} from 'react-router';

export function TaskPreview({task, groupId}) {
  const navigate = useNavigate()
  const { boardId } = useParams()
  

  const editTask = () => {
    navigate(`/board/${boardId}/${groupId}/${task.id}`)
  }

  return (
    <article className="task-preview hover-dark" onClick={editTask}>
      <div onClick={editTask}>
      {task.style && <div className='cover' style={task.style}></div>}
        <div className="task-content ">
          <p className="task-title ">{task.title}</p>
        </div>
      </div>
    </article>
  );
}