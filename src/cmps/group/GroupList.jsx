import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskList } from '../TaskList';
import { GroupOptions } from './GroupOptions';

export function GroupList({ onRemoveGroup, onDuplicateGroup, groups, onBoardUpdate, onSaveGroup }) {
  const [currGroupId, setCurrGroupId] = useState();
  

  const toggleGroupOptions = (groupId) => {
    setCurrGroupId(currGroupId === groupId ? '' : groupId);
  };

  function handleTitleChange({target}) {
      let group = groups.find(g => g.id === target.id)
      if(group.title !== target.value) {
        console.log(target);
        group.title = target.value
        onSaveGroup(group)
    }
}

  function onAddNewTask(newTask, groupId) {
    let group = groups.find(g => g.id === groupId)
    group.tasks.push(newTask)
    onSaveGroup(group)
}

  const handleOnDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    const updatedGroups = [...groups];

    if (type === 'groups') {
      const [reorderedGroup] = updatedGroups.splice(source.index, 1);
      updatedGroups.splice(destination.index, 0, reorderedGroup);
    }

    if (type === 'tasks') {
      const sourceGroupIndex = updatedGroups.findIndex((group) => group.id === source.droppableId);
      const destinationGroupIndex = updatedGroups.findIndex((group) => group.id === destination.droppableId);
      const sourceGroup = { ...updatedGroups[sourceGroupIndex] };
      const destinationGroup = { ...updatedGroups[destinationGroupIndex] };

      const [task] = sourceGroup.tasks.splice(source.index, 1);
      destinationGroup.tasks.splice(destination.index, 0, task);

      updatedGroups[sourceGroupIndex] = sourceGroup;
      updatedGroups[destinationGroupIndex] = destinationGroup;
    }

    onBoardUpdate(updatedGroups);
  };

  if (!groups) return <div>Loading groups</div>;

  return (
    <section className="group-list">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="groups" direction="horizontal" type="groups" key="groups">
          {(provided) => (
            <ul className="group-list clean-list groups" {...provided.droppableProps} ref={provided.innerRef}>
              {groups.map((group, index) => (
                <Draggable key={group.id} draggableId={group.id} index={index}>
                  {(provided) => (
                    <li
                      className="group-wrapper"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="group-top">
                        <input
                          type="text"
                          id={group.id}
                          defaultValue={group.title}
                          onBlur={(event) => handleTitleChange(event, group.id)}
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                        <button className="btn-more-options hover-dark" onClick={() => toggleGroupOptions(group.id)}>
                          ...
                        </button>
                        {currGroupId === group.id && (
                          <GroupOptions
                            toggleGroupOptions={toggleGroupOptions}
                            onRemoveGroup={onRemoveGroup}
                            onDuplicateGroup={onDuplicateGroup}
                            group={group}
                          />
                        )}
                      </div>
                      <TaskList groupId={group.id} tasks={group.tasks} onAddNewTask={onAddNewTask} />
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
  );
}
