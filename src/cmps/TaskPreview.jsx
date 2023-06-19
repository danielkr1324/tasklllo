import React from 'react';

export function TaskPreview({task}) {
  
  return (

    <div className="task-preview hover-dark">
     {task.style && <div className='cover' style={task.style}></div>}
      <div className="task-content ">
        <p className="task-title ">{task.title}</p>
      </div>
    </div>
  );
}