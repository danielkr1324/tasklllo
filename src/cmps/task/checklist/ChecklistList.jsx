import React, { useState } from "react";
import { ChecklistPreview } from "./ChecklistPreview";
import { ChecklistBarProgress } from "./ChecklistProgressBar";

export function ChecklistList({ checklist, updateChecklist, removeChecklist }) {
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const handleChange = ({ target }) => {
    const { value, name: field } = target;
    updateChecklist({ ...checklist, [field]: value });
  };

  const saveTodos = (e, todos) => {
    updateChecklist({ ...checklist, todos });
  };

  return (
    <article className="checklist-list full ">

      <div className="checklist-top ">
        <div className="checklist-title">
          <i className="fa-regular fa-square-check"></i>
          <input
            className="text-input"
            name="title"
            onChange={handleChange}
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
            value={checklist.title}
            type="text"
          />

          {!isTitleFocused && (
            <button onClick={() => removeChecklist(checklist)} className="btn-delete">Delete</button>
          )}
        </div>


        {isTitleFocused && (
          <button onClick={(ev) => ev.stopPropagation()} className="btn-save">
            Save
          </button>
        )}
        <ChecklistBarProgress todos={checklist.todos} />
      </div>
      <ChecklistPreview todos={checklist.todos} saveTodos={saveTodos} />
    </article>
  );
}
