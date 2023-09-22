import React, { useEffect, useState } from "react";
import { utilService } from "../services/util.service";
import { useSelector, useDispatch } from "react-redux";
import { loadBoard, updateBoard, removeGroup, addGroup, saveGroup } from "../store/actions/board.actions";
import { GroupList } from "../cmps/group/GroupList";
import { Outlet, useParams } from "react-router";
import { BoardMemberEdit } from "../cmps/board/BoardMemberEdit";
import { BoardSideMenu } from "../cmps/board/board-side-menu/BoardSideMenu";
import Loader from '../assets/images/loader.svg'

export function Board() {
  const {boardId} = useParams();
  const board = useSelector((storeState) => storeState.boardModule.board);
  const dispatch = useDispatch();

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isEditMember, setIsEditMember] = useState(false)
  const [isEditTitle, setIsEditTitle] = useState(false)

  useEffect(() => {
    loadNewBoard();
  }, [boardId]);

  const loadNewBoard = async () => {
    try {
      dispatch(loadBoard(boardId));
    } catch (err) {
      console.log(err);
    }
  };

  const closeMemberEdit = () => {
    setIsEditMember(false)
  }

  const onToggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const onToggleTitleEdit = () => {
    setIsEditTitle(!isEditTitle)
  }

  const changeBackground = async ({ background, backgroundColor, thumbnail }) => {
    const updatedBoard = { ...board, style: { background, backgroundColor, thumbnail } };
    try {
      dispatch(updateBoard(updatedBoard));
    } catch (err) {
      console.log('Failed to update board background', err);
    }
  };

  const getBoardStyle = () => {
    const boardStyle = board?.style || {};
    if (boardStyle.background) {
      return { background: `url("${boardStyle.background}") center center / cover` };
    } else if (boardStyle.backgroundColor) {
      return { backgroundColor: `${boardStyle.backgroundColor}` };
    }
    return { backgroundColor: `#0067a3` };
  };

  const onBoardUpdate = (groups) => {
    dispatch(updateBoard({ ...board, groups }));
  };

  const onMembersUpdate = (members) => {
    dispatch(updateBoard({ ...board, members }));
  };

  const onRemoveGroup = async (groupId) => {
    try {
      await dispatch(removeGroup(groupId));
    } catch (err) {
      console.log(err);
    }
  };

  const onDuplicateGroup = (group) => {
    const groupCopy = { ...group, id: utilService.makeId() };
    if (groupCopy.tasks.length) {
      groupCopy.tasks = groupCopy.tasks.map((task) => ({ ...task, id: utilService.makeId() }));
    }
    dispatch(addGroup(groupCopy));
  };

  const onSaveGroup = (group) => {
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id);
    const action = groupIdx !== -1 ? saveGroup : addGroup;
    dispatch(action(group));
  };

  

  const handleTitleChange = ({target}) => {
    onToggleTitleEdit()
    const newTitle = target.value.trim()
    if(newTitle === '' || newTitle === board.title) return
    dispatch(updateBoard({...board, title: newTitle}))
  }

  if (!board || board._id !== boardId) {
    return (
      <div className="loader-wrapper">
				<img className="loader" src={Loader} alt="loader" />
			</div>
    )
  }

  const boardStyle = getBoardStyle();
  const menuStatus = isSideMenuOpen ? 'open' : '';

  return (
    <section className="board" style={boardStyle}>
      <div className="board-info">
      <div className="info-left">
        {isEditTitle ? (
          <input
            autoFocus
            className="board-title-edit"
            onBlur={(event) => handleTitleChange(event)}
            type="text"
            defaultValue={board.title}
          />
        ) : (
          <h1 className="btn-board board-title" onClick={onToggleTitleEdit}>
            {board.title}
          </h1>
        )}
      </div>

        <div className="info-right">
          {board.members && <ul className="board-top-menu-members clean-list">
              {board.members.map((member, idx) => (
                <li style={{ zIndex: idx + 5 }} key={member._id}>
                  <img
                    height="30"
                    width="30"
                    style={{ borderRadius: '50%' }}
                    src={member.imgUrl}
                    title={`${member.fullname} (${member.username})`}
                    alt={member.username}
                  />
                </li>
              ))}
            </ul> }
            
          <button className="btn-share" onClick={() => setIsEditMember(!isEditMember)}><i className="fa-regular fa-user"></i>Share</button>
          <button className={`btn-board menu ${menuStatus}`} onClick={onToggleSideMenu}><i className="fa-solid fa-ellipsis"></i></button>
        </div>
      </div>
      <div>
        {isSideMenuOpen && <BoardSideMenu onToggleSideMenu={onToggleSideMenu} changeBackground={changeBackground} />}
      </div>

      <main className="board-main-content">
        <GroupList
          onRemoveGroup={onRemoveGroup}
          onBoardUpdate={onBoardUpdate}
          onDuplicateGroup={onDuplicateGroup}
          onSaveGroup={onSaveGroup}
          groups={board.groups}
          labels={board.labels}
          />
        {isEditMember && 
          <BoardMemberEdit
          boardAdmin={board.createdBy}
          boardMembers={board.members}
          closeMemberEdit={closeMemberEdit}
          onMembersUpdate={onMembersUpdate} />
        }
      </main>
      <Outlet />
    </section>
  );
}
