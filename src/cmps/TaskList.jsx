import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { boardService } from '../services/board.service'
import { TaskPreview } from './TaskPreview'

export function TaskList({group}) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const tasks = group.tasks

    return (
        <section className='task-list'>
             <Droppable droppableId={group.id}
                    key="tasks"
                    type="tasks"
                >
                    {(provided, snapshot) => (

                        <ul className="task-list clean-list tasks"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        // isDraggingOver={snapshot.isDraggingOver}
                        >

                            {tasks.map((task, index) =>

                                <Draggable
                                    key={task.id}
                                    group={group.id}
                                    type={task}
                                    draggableId={task.id}
                                    index={index}>

                                    {(provided, snapshot) => (

                                        <li key={task.id}
                                            ref={provided.innerRef}
                                            // isdragging={snapshot.isDragging}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >

                                            <TaskPreview
                                                group={group}
                                                task={task}
                                                board={board}
                                            />
                                        </li>)}

                                </Draggable>
                            )}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
        </section>
    )
}