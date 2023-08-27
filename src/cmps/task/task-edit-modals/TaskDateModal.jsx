import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function TaskDateModal({ task, submitTaskEdit }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onAddDueDate = async (ev) => {
    const dueDate = new Date(selectedDate).getTime();
    const updatedTask = { ...task, dueDate }; // Create a new task object with updated dueDate
    await submitTaskEdit( updatedTask);
  };

  const onRemoveDueDate = async (ev) => {
    const updatedTask = { ...task, dueDate: null }; // Create a new task object with dueDate removed
    await submitTaskEdit( updatedTask);
  };

  return (
    <section className="dates">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        calendarClassName="calendar"
        inline
      />
      <div className="dates-actions">
        <button
          onClick={onAddDueDate}
          className="btn-dates save"
        >
          Save
        </button>
        <button
          onClick={onRemoveDueDate}
          className="clean-btn btn-dates remove"
        >
          Remove
        </button>
      </div>
    </section>
  );
}

