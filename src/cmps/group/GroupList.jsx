import { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskList } from "../TaskList";
import { GroupOptions } from "./GroupOptions";
import { useDispatch } from "react-redux";
import { loadBoard, removeGroup } from "../../store/actions/board.actions";

export function GroupList({onBoardUpdate, board}) {
    const [groups, setGroups] = useState([])
    const [currGroupId, setCurrGroupId] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
            const groupsCpy = JSON.parse(JSON.stringify(board.groups))
            setGroups(groupsCpy)
        }, [])

    useEffect(() => { 
        onBoardUpdate({...board, groups})
    },[groups, board])

    function toggleGroupOptions(groupId) {
		if (currGroupId === groupId) {
			setCurrGroupId( '' )
		} else {
			setCurrGroupId( groupId )
		}
	}

    function onRemoveGroup(groupId) {
        dispatch(removeGroup(groupId, board._id))
        toggleGroupOptions(groupId)
    }
       
     

    function handleOnDragEnd(result) {
        const { destination, source, type } = result
    
        if (!destination) return
    
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return
    
        const boardCopy = { ...board }
        const newGroups = [...groups]
    
        if (type === 'groups') {
            const [reorderedGroup] = newGroups.splice(source.index, 1)
            newGroups.splice(destination.index, 0, reorderedGroup)
    
            boardCopy.groups = newGroups
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
    
            const newDestinationTasks = [...destinationGroup.tasks]
            newDestinationTasks.splice(destination.index, 0, task)
    
            sourceGroup.tasks = newSourceTasks
            destinationGroup.tasks = newDestinationTasks
    
            newGroups[sourceGroupIndex] = sourceGroup
            newGroups[destinationGroupIndex] = destinationGroup
                
            boardCopy.groups = newGroups
        }
        
       
        setGroups(boardCopy.groups)
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
                                                {group.title}
                                                <button
                                                        className="btn-more-options hover-dark"
                                                        onClick={() =>toggleGroupOptions( group.id)}
                                                    >...</button>
                                                {currGroupId === group.id && (
                                                        <GroupOptions
                                                            toggleGroupOptions={toggleGroupOptions}
                                                            onRemoveGroup={onRemoveGroup}
                                                            group={group}
                                                        />
                                                    )}
                                            </div>

                                            <TaskList
                                                group={group}
                                                board={board}
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