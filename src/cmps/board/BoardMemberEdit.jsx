import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../costumeHooks/useClickOutside";
import { UserDropdown } from "./UserDropdown";
import { utilService } from "../../services/util.service";



export function BoardMemberEdit({ boardAdmin, boardMembers, closeMemberEdit, onMembersUpdate }) {
  const users = useSelector((storeState) => storeState.userModule.users);
  const currBoardMembers = useSelector((storeState) => storeState.boardModule.board.members)
  const [username, setUsername] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const ref = useRef();

  useClickOutside(ref, () => {
    closeMemberEdit();
    setIsUserDropdownOpen(false); 
  });

  const debouncedHandleChange = utilService.debounce((inputUsername) => {
    if (inputUsername) {
      const regex = new RegExp(inputUsername, "i");
      const newFilteredUsers = users.filter((user) => regex.test(user.username));
      setFilteredUsers(newFilteredUsers);
      setIsUserDropdownOpen(true);
    } else {
      setFilteredUsers([]);
      setIsUserDropdownOpen(false);
    }
  }, 500);

  const handleInputChange = (event) => {
    const inputUsername = event.target.value.trim();
    setUsername(inputUsername);
    debouncedHandleChange(inputUsername);
  };

  function closeUserDropdown() {
    setIsUserDropdownOpen(false)
  }

  const onSetUserName = (selectedUsername) => {
    const userIdx = currBoardMembers.findIndex(u => u.username === selectedUsername)
    if(userIdx !== -1) return
    setUsername(selectedUsername);
    setIsUserDropdownOpen(false);
  };

  const addBoardMember = async () => {
    const memberToAdd = users.find((user) => user.username === username);

    if (memberToAdd) {
      const newMembers = [...boardMembers, memberToAdd];
      await onMembersUpdate(newMembers);
      setUsername("");
    } else {
      console.log("User not found.");
    }
  };

  if (!users) return <p>Loading</p>;

  return (
    <article className="board-member-edit">
      <div ref={ref} className="member-edit-modal">
        <button onClick={closeMemberEdit} className="btn-close">
          <i className="fa-solid fa-x"></i>
        </button>

        <h1>Share board</h1>
        <div className="member-search">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            autoComplete="off"
            onChange={handleInputChange} 
          />
          <button onClick={addBoardMember} className="btn-save">
            Share
          </button>
          {isUserDropdownOpen && filteredUsers.length !== 0 && (
            <UserDropdown 
              filteredUsers={filteredUsers} 
              onSetUserName={onSetUserName}
              closeUserDropdown={closeUserDropdown} />
          )}
        </div>

        <ul className="current-members clean-list">
          {boardMembers.map((user) => (
            <li className="member-preview" key={user._id}>
              <div className="member-info">
                <img src={user.imgUrl} alt="" style={{ borderRadius: "50%" }} />
                <p>{user.username}</p>
              </div>
              <label className="btn-edit">
                {boardAdmin._id === user._id ? "Admin" : "Member"}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
