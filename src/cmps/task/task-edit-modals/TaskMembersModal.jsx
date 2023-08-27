import React, { useState } from 'react';

export function TaskMembersModal({ task, members, submitTaskEdit }) {
  const memberIds = task.memberIds;
  const [toRender, setToRender] = useState(members);

  function onToggleMember(id) {
    const updatedMemberIds = memberIds.includes(id)
      ? memberIds.filter(member => member !== id)
      : [...memberIds, id];

    const updatedTask = { ...task, memberIds: updatedMemberIds };
    submitTaskEdit(updatedTask);
  }

  function handleChange({ target }) {
    const regex = new RegExp(target.value, 'i');
    const filteredMembers = members.filter(member => regex.test(member.fullname));
    setToRender(filteredMembers);
  }

  return (
    <div className='member-modal'>
      <h3 className="dynamic-modal-title">Members</h3>
      <input
        type="text"
        className='modal-search'
        name="txt"
        id="txt"
        placeholder="Search member"
        onChange={handleChange}
        autoFocus
        autoComplete="off"
      />
      <h3 className='modal-sub-title'>Board members</h3>
      <ul className='member-list clean-list'>
        {toRender.map(member => (
          <li key={member._id} className="member-preview" onClick={() => onToggleMember(member._id)}>
            <div className='member-info'>
                <img className='member-img' src={member.imgUrl} alt={member.imgUrl} />
                <span className="member-name">{member.fullname}</span>
            </div>
            {memberIds.includes(member._id) && <span><i className="fa-solid fa-check"></i></span>}
          </li>
        ))}
        {!toRender.length && <li>No results</li>}
      </ul>
    </div>
  );
}
