import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskList } from '../task/TaskList';
import { GroupOptions } from './GroupOptions';
import { boardService } from '../../services/board.service';

export function GroupList({ onRemoveGroup, onDuplicateGroup, groups, onBoardUpdate, onSaveGroup, labels }) {
  const [groupIdEditTitle, setGroupIdEditTitle] = useState(null);
  const [groupIdOpt, setGroupIdOpt] = useState(null)


  const onAddNewGroup = () => {
    const newGroup = boardService.getEmptyGroup();
    onSaveGroup(newGroup);
  };

 const closeGroupOpt = () => {
  setGroupIdOpt(null)
 }

  const handleTitleChange = async ({ target }) => {
    setGroupIdEditTitle(null);
    let group = groups.find((g) => g.id === target.id);
    if (group.title !== target.value) {
      group.title = target.value;
      await onSaveGroup(group);
    }
  };

  const onSaveTask = (task, groupId) => {
    const group = groups.find((g) => g.id === groupId);
    const taskIdx = group.tasks.findIndex((t) => t.id === task.id);
    if (taskIdx !== -1) group.tasks.splice(taskIdx, 1, task);
    else group.tasks.push(task);
    onSaveGroup(group);
  };

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
                        {groupIdEditTitle !== group.id  && group.title? (
                          <h2 className="group-title" onClick={() => setGroupIdEditTitle(group.id)}>
                            {group.title}
                          </h2>
                        ) : (
                          <input
                            placeholder="Enter list title..."
                            autoFocus
                            type="text"
                            id={group.id}
                            defaultValue={group.title}
                            onBlur={(event) => handleTitleChange(event, group.id)}
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        )}
                        <button className="btn-more-options hover-dark" onClick={() => setGroupIdOpt(group.id)}>
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                        { groupIdOpt === group.id && (
                          <GroupOptions
                            closeGroupOpt={closeGroupOpt}
                            onRemoveGroup={onRemoveGroup}
                            onDuplicateGroup={onDuplicateGroup}
                            group={group}
                          />
                        )}
                      </div>
                      <TaskList groupId={group.id} tasks={group.tasks} onSaveTask={onSaveTask} labels={labels} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <div onClick={onAddNewGroup} className="add-group">
        <span>+ Add another list</span>
      </div>
    </section>
  );
}
