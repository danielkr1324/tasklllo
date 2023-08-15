import React, { useState } from "react";
import { boardService } from "../../../services/board.service";

export function TaskChecklistModal({ task, submitTaskEdit }) {
  const [checklistTitle, setChecklistTitle] = useState("Checklist");
  const { checklists } = task;

  const handleChange = ({ target }) => {
    const { value, type } = target;
    const newValue = type === "number" ? +value : value;
    setChecklistTitle(newValue);
  };

  const addCheckList = async (ev) => {
    ev.preventDefault();
    const newChecklist = boardService.getEmptyChecklist();
    newChecklist.title = checklistTitle;
    const updatedChecklists = [...checklists, newChecklist];
    const newTask = { ...task, checklists: updatedChecklists };
    await submitTaskEdit(newTask);
  };

  return (
    <div className="task-checklist-modal">
      <h2 className="dynamic-modal-title">title</h2>
      <div className="checklist-add">
        <input
          className="checklist-title-input"
          type="text"
          autoFocus
          onChange={handleChange}
          value={checklistTitle}
        />
        <button onClick={(ev) => addCheckList(ev)}>Add</button>
      </div>
    </div>
  );
}
