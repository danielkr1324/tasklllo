import React from 'react';

export function TaskPreview({task}) {
  
  return (
    <div className="task-preview hover-dark">
      <p>{task.title}</p>
    </div>
  );
}