import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskList } from "../TaskList";
import { GroupOptions } from "./GroupOptions";


export function GroupList({onRemoveGroup, onDuplicateGroup, groups, onBoardUpdate, onSaveGroup}) {
    const [currGroupId, setCurrGroupId] = useState('')

    function toggleGroupOptions(groupId) {
		if (currGroupId === groupId) {
			setCurrGroupId( '' )
		} else {
			setCurrGroupId( groupId )
		}
	}

    function handleTitleChange({target}) {
        let group = groups.find(g => g.id === target.id)
        group.title = target.value
        onSaveGroup(group)
    }
     
    function handleOnDragEnd(result) {
        const { destination, source, type } = result
    
        if (!destination) return
    
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return
    
            const newGroups = JSON.parse(JSON.stringify(groups))
    
        if (type === 'groups') {
            const [reorderedGroup] = newGroups.splice(source.index, 1)
            newGroups.splice(destination.index, 0, reorderedGroup)
    
            groups = newGroups
        }
    
        if (type === 'tasks') {
            
            const sourceGroupIndex = newGroups.findIndex(
                (group) => group.id === source.droppableId
            )
            const destinationGroupIndex = newGroups.findIndex(
                (group) => group.id === destination.droppableId
            )
    
            const sourceGroup = { ...newGroups[sourceGroupIndex] }
            const destinationGroup = { ...newGroups[destinationGroupIndex] }
    
            const newSourceTasks = [...sourceGroup.tasks]
            const [task] = newSourceTasks.splice(source.index, 1)
            console.log(task);
    
            const newDestinationTasks = [...destinationGroup.tasks]
            newDestinationTasks.splice(destination.index, 0, task)
    
            sourceGroup.tasks = newSourceTasks
            destinationGroup.tasks = newDestinationTasks
    
            newGroups[sourceGroupIndex] = sourceGroup
            newGroups[destinationGroupIndex] = destinationGroup
                
            groups = newGroups
        }
        onBoardUpdate(groups)
    }

    
    
    if (!groups) return <div>Loading groups</div>

    return (
        <section className="group-list">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable
                    droppableId="groups"
                    direction="horizontal"
                    type="groups"
                    key="groups"
                >
                    {(provided) => (
                        <ul
                            className="group-list clean-list groups"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {groups.map((group, index) => (
                                <Draggable
                                    key={group.id}
                                    draggableId={group.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            className="group-wrapper"
                                            key={group.id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >   

                                            <div className="group-top">
                                                <input 
                                                type="text"
                                                id={group.id}
                                                defaultValue={group.title} 
                                                onChange={handleTitleChange}/>
                                                <button
                                                        className="btn-more-options hover-dark"
                                                        onClick={() =>toggleGroupOptions( group.id)}
                                                    >...</button>
                                                {currGroupId === group.id && (
                                                        <GroupOptions
                                                            toggleGroupOptions={toggleGroupOptions}
                                                            onRemoveGroup={onRemoveGroup}
                                                            onDuplicateGroup={onDuplicateGroup}
                                                            group={group}
                                                        />
                                                    )}
                                            </div>

                                            <TaskList
                                                groupId={group.id}
                                                tasks={group.tasks}
                                                onBoardUpdate={onBoardUpdate}
                                            />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )

}