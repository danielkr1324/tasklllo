import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { boardService } from "../../services/board.service";
import { saveGroup, updateBoard } from "../../store/actions/board.actions";
import { ChecklistList } from "./checklist/ChecklistList";
import { TaskDueDate } from "./checklist/TaskDueDate";
import { DynamicModal } from "./DynamicModal";

export function TaskEdit() {
  const [task, setTask] = useState({});
  const [labels, setBoardLabels] = useState([])
  const [sideBarModalType, setSideBarModalType] = useState("");
  const { boardId, groupId, taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    setTaskToEdit();
  }, [taskId]);

  const taskLabels = task.labelIds ? labels.filter(label => task.labelIds.includes(label.id)) : [];


  const setTaskToEdit = async ()=> {
    const currTask = await boardService.getTaskById(boardId, groupId, taskId);
    const boardLabels= await boardService.getBoardLabels(boardId)
    setBoardLabels(boardLabels)
    setTask(currTask);
  }

  const editTask = ({ target }) => {
    const { value, name: field } = target;
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const submitTaskEdit = async (currTask) => {
    setTask(currTask);
    const group = await boardService.getGroupById(groupId, boardId);
    const taskIdx = group.tasks.findIndex((t) => t.id === currTask.id);
    group.tasks.splice(taskIdx, 1, currTask);
    dispatch(saveGroup(group, boardId));
    if (sideBarModalType !== 'TaskLabelModal') setSideBarModalType('');
  }

  const updateChecklist = (updatedChecklist) => {
    const checklistIdx = task.checklists.findIndex((cl) => cl.id === updatedChecklist.id);
    const newChecklists = [...task.checklists];
    newChecklists.splice(checklistIdx, 1, updatedChecklist);
    const newTask = { ...task, checklists: newChecklists };
    submitTaskEdit(newTask);
  };

  const removeChecklist = (checklist) => {
    const checklistIdx = task.checklists.findIndex((cl) => cl.id === checklist.id);
    const newChecklists = [...task.checklists];
    newChecklists.splice(checklistIdx, 1);
    const newTask = { ...task, checklists: newChecklists };
    submitTaskEdit(newTask);
  };

  const onCloseTaskModal = (event) => {
    event.preventDefault();
    navigate(`/board/${boardId}`);
  }

  const boardLabelsUpdate = async  (labels) => {
    const board = await boardService.getBoardById(boardId)
    setBoardLabels(labels)
    dispatch(updateBoard({ ...board, labels }));
  };

  const renderChecklists = () => {
    if (!task.checklists || task.checklists.length === 0) {
      return null;
    }
    return task.checklists.map((checklist) => (
      <ChecklistList key={checklist.id} 
      checklist={checklist} 
      updateChecklist={updateChecklist} 
      removeChecklist={removeChecklist} 
      />
    ));
  }

  return (
    <div onClick={(e) => onCloseTaskModal(e)} className="task-edit">
      <div onClick={(e) => e.stopPropagation()} className="modal-content">
        {task.style && <div className="cover" style={task.style}></div>}
        <div className="content-wrapper ">
          <div className="title-in-task main-container">
          <i className="fa-regular fa-newspaper"></i>
            <input
              className="text-input"
              name="title"
              onChange={(e) => editTask(e)}
              onBlur={() => submitTaskEdit(task)}
              type="text"
              defaultValue={task.title}
              />
          </div>
          <main className="modal-edit ">
            <div className="task-main main-container">
              <ul className='task-edit-actions clean-list '>
                {taskLabels.length > 0 &&
                  <div>
                    <h3>Labels</h3>
                    <div className="label-edit-container">
                      {taskLabels.map(label => (
                        <li onClick={() => setSideBarModalType('TaskLabelModal')} key={label.id} className='task-edit-label' style={{ backgroundColor: `${label.color}` }}>
                          <p>{label.title}</p>
                        </li>
                      ))}
                    </div>
                  </div>
                }
                {task.dueDate &&
                  <TaskDueDate
                    task={task}
                    submitTaskEdit={submitTaskEdit}
                    setSideBarModalType={setSideBarModalType}
                  />}
              </ul>
              <div className="task-description full">
                <div className="title-in-task">
                  <i title='Description' className="fa-solid fa-align-left"></i>   
                  <h2>Description</h2>
                </div>
                <textarea
                  name="description"
                  onChange={(e) => editTask(e)}
                  onBlur={() => submitTaskEdit(task)}
                  defaultValue={task.description}
                  placeholder="Add a more detailed description..."
                />
              </div>
              {renderChecklists()}
            </div>
            <div className="modal-sidebar">
              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskCoverModal")}
              >
                <i className="fa-regular fa-image"></i>Cover
              </button>

              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskChecklistModal")}
              >
                <i className="fa-regular fa-square-check"></i>Checklist
              </button>

              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskLabelModal")}
              >
                <i className="fa-solid fa-tag"></i>Labels
              </button>

              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskDateModal")}
              >
                <i className="fa-regular fa-clock"></i>Dates
              </button>
            </div>
          </main>
          {sideBarModalType && (
            <DynamicModal
              setSideBarModalType={setSideBarModalType}
              sideBarModalType={sideBarModalType}
              submitTaskEdit={submitTaskEdit}
              task={task}
              labels={labels}
              boardLabelsUpdate={boardLabelsUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
