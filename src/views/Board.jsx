import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadBoard, updateBoard, removeGroup, addGroup, saveGroup } from "../store/actions/board.actions";
import { GroupList } from "../cmps/group/GroupList";
import { Outlet } from "react-router";
import { BoardSideMenu } from "../cmps/board/board-side-menu/BoardSideMenu";

export function Board() {
  const boardId = "b101";
  const board = useSelector((storeState) => storeState.boardModule.board);
  const dispatch = useDispatch();

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    console.log(1);
    loadNewBoard();
  }, [boardId]);

  const loadNewBoard = async () => {
    try {
      dispatch(loadBoard(boardId));
    } catch (err) {
      console.log(err);
    }
  };

  const onToggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const changeBackground = async ({ background, backgroundColor, thumbnail }) => {
    const updatedBoard = { ...board, style: { background, backgroundColor, thumbnail } };
    try {
      await dispatch(updateBoard(updatedBoard));
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

  const onRemoveGroup = async (groupId) => {
    try {
      await dispatch(removeGroup(groupId, boardId));
    } catch (err) {
      console.log(err);
    }
  };

  const onDuplicateGroup = (group) => {
    const groupCopy = { ...group, id: "" };
    if (groupCopy.tasks.length) {
      groupCopy.tasks = groupCopy.tasks.map((task) => ({ ...task, id: "" }));
    }
    dispatch(addGroup(groupCopy, boardId));
  };

  const onSaveGroup = (group) => {
    const action = group.id ? saveGroup : addGroup;
    dispatch(action(group, boardId));
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  const boardStyle = getBoardStyle();
  const menuStatus = isSideMenuOpen ? 'open' : '';

  return (
    <section className="board" style={boardStyle}>
      <div className="board-info">
        <h1 className="btn-board board-title">{board.title}</h1>
        <button className={`btn-board menu ${menuStatus}`} onClick={onToggleSideMenu}>...</button>
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
      </main>
      <Outlet />
    </section>
  );
}
