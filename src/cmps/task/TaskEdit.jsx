import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { boardService } from "../../services/board.service";
import { saveGroup, updateBoard } from "../../store/actions/board.actions";
import { ChecklistList } from "./checklist/ChecklistList";
import { TaskDueDate } from "./TaskDueDate";
import { DynamicModal } from "./DynamicModal";
import { TaskAttachmentPreview } from "./attachment/TaskAttachmentPreview";
import Loader from '../../assets/images/loader.svg'

export function TaskEdit() {
  const [task, setTask] = useState({});
  const [labels, setBoardLabels] = useState([]);
  const [sideBarModalType, setSideBarModalType] = useState("");
  const { boardId, groupId, taskId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const board = useSelector(storeState => storeState.boardModule.board);
  const currGroup = board.groups.find(group => group.id === groupId);
  const currTask = currGroup.tasks.find(task => task.id === taskId)
  const boardLabels = board.labels;
  const taskLabels = task.labelIds ? labels.filter(label => task.labelIds.includes(label.id)) : [];
  const taskMembers = task.memberIds ? board.members.filter(m => task.memberIds.includes(m._id)) : [];

  
  const labelBtn = useRef();
  const checklistBtn = useRef();
  const dateBtn = useRef();
  const coverBtn = useRef();
  const membersBtn = useRef();
  const attachmentBtn = useRef()

  const getRefData = (type) => {
    switch (type) {
      case 'TaskLabelModal':
        return labelBtn;
      case 'TaskChecklistModal':
        return checklistBtn;
      case 'TaskDateModal':
        return dateBtn;
      case 'TaskCoverModal':
        return coverBtn;
      case 'TaskMembersModal':
        return membersBtn;
      case 'TaskAttachmentModal':
        return attachmentBtn;
      default:
        return null;
    }
  };

  useEffect(() => {
    setTaskToEdit();
    console.log(1);
  }, [taskId]);

  const setTaskToEdit = async () => {
    
    
    setBoardLabels(boardLabels);
    setTask(currTask);
  };

  const editTask = ({ target }) => {
    const { value, name: field } = target;
    setTask(prevTask => ({ ...prevTask, [field]: value }));
  };

  const submitTaskEdit = async (currTask) => {
    setTask(currTask);
    const taskIdx = currGroup.tasks.findIndex(t => t.id === currTask.id);
    currGroup.tasks.splice(taskIdx, 1, currTask);
    dispatch(saveGroup(currGroup));
    if (sideBarModalType === 'TaskLabelModal' || sideBarModalType === 'TaskMembersModal') return;
    setSideBarModalType('');
  };

  const updateChecklist = (updatedChecklist) => {
    const checklistIdx = task.checklists.findIndex(cl => cl.id === updatedChecklist.id);
    const newChecklists = [...task.checklists];
    newChecklists.splice(checklistIdx, 1, updatedChecklist);
    const newTask = { ...task, checklists: newChecklists };
    submitTaskEdit(newTask);
  };

  const removeChecklist = (checklist) => {
    const checklistIdx = task.checklists.findIndex(cl => cl.id === checklist.id);
    const newChecklists = [...task.checklists];
    newChecklists.splice(checklistIdx, 1);
    const newTask = { ...task, checklists: newChecklists };
    submitTaskEdit(newTask);
  };

  const onCloseTaskModal = (event) => {
    event.preventDefault();
    navigate(`/board/${boardId}`);
  };

  const boardLabelsUpdate = async (labels) => {
    setBoardLabels(labels);
    dispatch(updateBoard({ ...board, labels }));
  };

  const renderChecklists = () => {
    if (!task.checklists || task.checklists.length === 0) {
      return null;
    }
    return task.checklists.map(checklist => (
      <ChecklistList
        key={checklist.id}
        checklist={checklist}
        updateChecklist={updateChecklist}
        removeChecklist={removeChecklist}
      />
    ));
  };

  // if (!task.title) {
  //   return (
  //     <div onClick={e => onCloseTaskModal(e)} className="task-edit">
  //       <div className="loader-wrapper">
  //         <img className="loader" src={Loader} alt="loader" />
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div onClick={e => onCloseTaskModal(e)} className="task-edit">
      <div onClick={e => e.stopPropagation()} className="modal-content">
        <button onClick={e => onCloseTaskModal(e)} className="btn-close task-edit-close">
          <i className="fa-solid fa-x"></i>
        </button>
        {task.style && task.style.color && <div className="edit-cover-color" style={task.style}></div>}
        {task.style && !task.style.color && <div className="edit-cover-img" style={task.style}></div>}
        <div className="content-wrapper">
          <div className="title-in-task main-container">
            <i className="fa-regular fa-newspaper  full"></i>
            <input
              className="text-input"
              name="title"
              onChange={e => editTask(e)}
              onBlur={() => submitTaskEdit(task)}
              type="text"
              defaultValue={task.title}
            />
          </div>
          <main className="modal-edit">
            <div className="task-main main-container">
              <ul className="task-edit-actions clean-list">
                {taskMembers.length > 0 && (
                  <div>
                    <h3>Members</h3>
                    <div className="members-edit-container">
                      {taskMembers.map(m => (
                        <li
                          key={m._id}
                          className="task-edit-members"
                        >
                          <img src={m.imgUrl} alt="" style={{ borderRadius: '50%' }} />
                        </li>
                      ))}
                    </div>
                  </div>
                )}
                {taskLabels.length > 0 && (
                  <div>
                    <h3>Labels</h3>
                    <div className="label-edit-container">
                      {taskLabels.map(label => (
                        <li
                          onClick={() => setSideBarModalType('TaskLabelModal')}
                          key={label.id}
                          className="task-edit-label"
                          style={{ backgroundColor: label.color }}
                        >
                          <p>{label.title}</p>
                        </li>
                      ))}
                    </div>
                  </div>
                )}
                {task.dueDate && (
                  <TaskDueDate
                    task={task}
                    submitTaskEdit={submitTaskEdit}
                    setSideBarModalType={setSideBarModalType}
                  />
                )}
              </ul>
              <div className="task-description full">
                <div className="title-in-task">
                  <i title="Description" className="fa-solid fa-align-left"></i>
                  <h2>Description</h2>
                </div>
                <textarea
                  name="description"
                  onChange={e => editTask(e)}
                  onBlur={() => submitTaskEdit(task)}
                  defaultValue={task.description}
                  placeholder="Add a more detailed description..."
                />
              </div>

              {task.attachments && task.attachments.length > 0 && (
                <TaskAttachmentPreview
                  task={task}
                  submitTaskEdit={submitTaskEdit}
                />
              )}

              {renderChecklists()}
            </div>

            <div className="modal-sidebar">
              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskMembersModal")}
                ref={membersBtn}
              >
                <i className="fa-solid fa-user"></i>Members
              </button>

              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskCoverModal")}
                ref={coverBtn}
              >
                <i className="fa-regular fa-image"></i>Cover
              </button>

              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskChecklistModal")}
                ref={checklistBtn}
              >
                <i className="fa-regular fa-square-check"></i>Checklist
              </button>

              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskLabelModal")}
                ref={labelBtn}
              >
                <i className="fa-solid fa-tag"></i>Labels
              </button>

              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskDateModal")}
                ref={dateBtn}
              >
                <i className="fa-regular fa-clock"></i>Dates
              </button>

              
              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskAttachmentModal")}
                ref={attachmentBtn}
              >
                <i className="fa-solid fa-paperclip"></i>Attachment
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
              refBtn={getRefData(sideBarModalType)}
              members={board.members}
            />
          )}
        </div>
      </div>
    </div>
  );
}
