import React, { useEffect } from 'react';

export function TaskPreview({ group, task, board }) {
  
  return (
    <div className="task-preview hover-dark">
      <p>{task.title}</p>
    </div>
  );
}