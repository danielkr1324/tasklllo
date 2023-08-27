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
      <h3 className="dynamic-modal-title">Add checklist</h3>
      <div className="checklist-add">
        <h3 className="modal-sub-title">title</h3>
        <input
          className="checklist-title-edit"
          type="text"
          autoFocus
          onChange={handleChange}
          value={checklistTitle}
        />
        <button className="btn-save" onClick={(ev) => addCheckList(ev)}>Add</button>
      </div>
    </div>
  );
}
