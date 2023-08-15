import { useNavigate, useParams } from 'react-router';

export function TaskPreview({ task, groupId, labels }) {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const taskLabels = task.labelIds ? labels.filter(label => task.labelIds.includes(label.id)) : [];

  const editTask = () => {
    navigate(`/board/${boardId}/${groupId}/${task.id}`);
  };

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
        </div>
      </div>
    </article>
  );
}