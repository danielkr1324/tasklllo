import { useEffect, useState } from "react";
import { TaskCover } from "./task-edit-modals/TaskCover";
import { useParams, useNavigate } from "react-router";
import { boardService } from "../services/board.service";
import { saveGroup } from "../store/actions/board.actions";
import { useDispatch } from "react-redux";

export function TaskEdit() {
  const [task, setTask] = useState({});
  const [sideBarModalType, setSideBarModalType] = useState("");
  const { boardId, groupId, taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskToEdit();
  }, [taskId]);

  async function setTaskToEdit() {
    const currTask = await boardService.getTaskById(boardId, groupId, taskId);
    setTask(currTask);
  }

  const editTask = ({ target }) => {
    let { value, name: field } = target;
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  async function submitTaskEdit(currTask = task) {
    const group = await boardService.getGroupById(groupId, boardId);
    const taskIdx = group.tasks.findIndex((t) => t.id === currTask.id);
    group.tasks.splice(taskIdx, 1, currTask);
    dispatch(saveGroup(group, boardId));
  }

  function onCloseTaskModal(event) {
    event.preventDefault();
    navigate(`/board/${boardId}`);
  }

  if (!task) return null;
  return (
    <div onClick={(e) => onCloseTaskModal(e)} className="task-edit">
      <div onClick={(e) => e.stopPropagation()} className="modal-content">
        {task.style && <div className="cover" style={task.style}></div>}
        <div className="content-wrapper">
          <input
            name="title"
            onChange={(e) => editTask(e)}
            onBlur={() => submitTaskEdit(task)}
            type="text"
            defaultValue={task.title}
          />
          <main className="modal-edit">
            <div className="task-main">
              <h2>Description</h2>
              <textarea
                name="description"
                onChange={(e) => editTask(e)}
                onBlur={() => submitTaskEdit(task)}
                defaultValue={task.description}
                placeholder="Add a more detailed description..."
              />
            </div>

            <div className="modal-sidebar">
              <button
                className="btn-edit"
                onClick={() => setSideBarModalType("TaskCover")}
              >
                cover
              </button>
            </div>
          </main>

          {sideBarModalType && (
            <TaskCover
              submitTaskEdit={submitTaskEdit}
              task={task}
              groupId={groupId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
