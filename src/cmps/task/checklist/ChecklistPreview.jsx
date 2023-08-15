import React, { useState } from "react";
import { boardService } from "../../../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function ChecklistPreview({ todos, saveTodos }) {
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [currTodo, setCurrTodo] = useState(boardService.getEmptyTodo());

  const editTodo = ({ target: { value, name } }) => {
    setCurrTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const toggleTodoDone = (e) => {
    const clickedTodoId = e.target.id;
    const updatedTodos = todos.map((todo) =>
      todo.id === clickedTodoId ? { ...todo, isDone: !todo.isDone } : todo
    );
    saveTodos(e, updatedTodos);
  };



  const addTodo = (e) => {
    e.preventDefault();
    if (!currTodo.title.trim()) return;
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((t) => t.id === currTodo.id);
    const newTodo = { ...currTodo };
    if (todoIndex !== -1) {
      newTodos.splice(todoIndex, 1, newTodo);
    } else {
      newTodos.push(newTodo);
    }
    saveTodos(e, newTodos);
    setIsAddTodo(false);
    setCurrTodo(boardService.getEmptyTodo());
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    saveTodos(null, items);
  };

   return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="checklist">
        {(provided) => (
          <section
            className="checklist-preview"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <ul className="checklist-todos clean-list">
              {todos.length > 0 &&
                todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <li
                        className="todo"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          onChange={toggleTodoDone}
                          checked={todo.isDone}
                          className="task-checklist-checkbox"
                          type="checkbox"
                          id={todo.id}
                        />
                        <span
                          className="todo-desc"
                          style={{
                            textDecoration: todo.isDone
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {todo.title}
                        </span>
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          </section>
        )}
      </Droppable>

      {!isAddTodo && (
        <button onClick={() => setIsAddTodo(true)}>Add an item</button>
      )}

      {isAddTodo && (
        <form onSubmit={addTodo}>
          <textarea
            name="title"
            placeholder="Add an item"
            autoComplete="off"
            autoFocus
            onChange={editTodo}
            value={currTodo.title}
          />
          <button type="submit" className="btn-save">
            Add
          </button>
        </form>
      )}
    </DragDropContext>
  );
}
