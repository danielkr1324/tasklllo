import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../costumeHooks/useClickOutside";

export function BoardMemberEdit({ boardMembers, closeMemberEdit, onMembersUpdate }) {
  const users = useSelector(storeState => storeState.userModule.users);
  const [username, setUsername] = useState("");
  const ref = useRef();

  useClickOutside(ref, closeMemberEdit);


  function handleChange({ target }) {
    // const regex = new RegExp(target.value, 'i');
    // const filteredUsers = users.filter(user => regex.test(user.username));
    // setUsername(filteredUsers);
    setUsername(target.value)
    // console.log(target.value);
  }

  async function addBoardMember() {
    const memberToAdd = users.find(user => user.username === username);
    if (memberToAdd) {
      const newMembers = [...boardMembers, memberToAdd];
      onMembersUpdate(newMembers);
    }else console.log('no user');
  }

  if (!users) return <p>Loading</p>;

  return (
    <article className="board-member-edit">
      <div ref={ref} className="member-edit-modal">
        <h1>Share board</h1>
        <div className="member-search">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={handleChange}
          />
          <button onClick={addBoardMember} className="btn-save">Share</button>
        </div>
        <ul className="current-members clean-list">
          {boardMembers.map(user => (
            <li className="member-preview" key={user._id}>
                <img src={user.imgUrl} alt="" />
                <p>{user.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
