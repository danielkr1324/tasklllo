import React, { useEffect } from 'react';

export function TaskPreview({ group, task, board }) {
  useEffect(() => {
    // Do something when group, task, or board props change
    // This will trigger a re-render of the TaskPreview component
  }, [group, task, board]);

  return (
    <div className="task-preview">
      <p>{task.title}</p>
    </div>
  );
}