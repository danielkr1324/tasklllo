import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskPreview } from './TaskPreview'

export function TaskList({groupId, tasks}) {

    return (
        <section className='task-list'>
             <Droppable droppableId={groupId}
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
                                    group={groupId}
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
                                                task={task}
                                            />
                                        </li>)}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <button className='hover-dark'>+ Add a card</button>
        </section>
    )
}