import React, { useState, useRef, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskPreview } from './TaskPreview';
import { boardService } from '../../services/board.service';

export function TaskList({ groupId, tasks, onSaveTask, labels }) {
  const [isAddTask, setIsAddTask] = useState(false);
  const [newTask, setNewTask] = useState(boardService.getEmptyTask())
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isAddTask) {
      textareaRef.current.focus();
    }
  }, [isAddTask]);


  const toggleIsAddTask = () => {
    setIsAddTask(!isAddTask);
    setNewTask(boardService.getEmptyTask());
  };

  const cancelNewTodo = () => {
    setIsAddTask(!isAddTask);
    setNewTask(prevTask => ({...prevTask, title: '' }));
  }

  const editNewTask = ({ target }) => {
    let { value, name: field } = target
    setNewTask((prevTask) => ({ ...prevTask, [field]: value }))
  };

  const addNewTask = (event) => {
    event.preventDefault();
    toggleIsAddTask();
    if (newTask.title.trim() !== '') {
        onSaveTask(newTask, groupId);
        toggleIsAddTask()
    }
  };


  return (
    <section className="task-list">

      <Droppable droppableId={groupId} type="tasks" key="tasks">
        {(provided, snapshot) => (
          <ul
            className="task-list clean-list tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    key={task.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskPreview 
                      task={task}
                      groupId={groupId}
                      labels={labels} 
                      onSaveTask={onSaveTask}/>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <section  className="group-bottom">
        {!isAddTask ? (
          <button className="btn-add-task hover-dark" onClick={toggleIsAddTask}>
            <i className="fa-solid fa-plus"></i> Add a card
          </button>
        ) : (
          <div className="task-compose">
            <form onSubmit={addNewTask}>
                <textarea 
                    name="title" 
                    id={groupId} 
                    placeholder='Enter a title for this card...'
                    onChange={editNewTask}
                    onBlur={addNewTask} 
                    ref={textareaRef}
                    >
                </textarea>

                <div className='set-changes'>
                  <button className='btn-save' type="submit">Add card</button>
                  <button className='btn-cancel' type="button" onClick={cancelNewTodo}>
                    <i className="fa-solid fa-x"></i>
                  </button>
                </div>
            </form>
          </div>
        )}
      </section>
    </section>
  );
}
