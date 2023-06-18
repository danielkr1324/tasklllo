import React, { useState, useRef, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskPreview } from './TaskPreview';
import { boardService } from '../services/board.service';

export function TaskList({ groupId, tasks, onAddNewTask }) {
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

  const editNewTask = ({ target }) => {
    let { value, name: field } = target
    setNewTask((prevTask) => ({ ...prevTask, [field]: value }))
  };

  const addNewTask = (event) => {
    event.preventDefault();
    toggleIsAddTask();
    if (newTask.title.trim() !== '') {
      onAddNewTask(newTask, groupId);
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
                    <TaskPreview task={task} />
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
          <button className="hover-dark" onClick={toggleIsAddTask}>
            + Add a card
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
              <button type="submit">Add card</button>
              <button type="button" onClick={toggleIsAddTask}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </section>
    </section>
  );
}
