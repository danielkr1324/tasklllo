import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadBoard,
  updateBoard,
  removeGroup,
  addGroup,
  saveGroup,
} from "../store/actions/board.actions";
import { GroupList } from "../cmps/group/GroupList";

export function Board() {
  const boardId = "b101"; // TODO: change later
  const board = useSelector((storeState) => storeState.boardModule.board);
  const dispatch = useDispatch();

  useEffect(() => {
    loadNewBoard();
  }, [boardId]);

  async function loadNewBoard() {
    try {
      dispatch(loadBoard(boardId));
    } catch (err) {
      console.log(err);
    }
  }

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
    const groupCopy = { ...group };
    groupCopy.id = "";

    if (groupCopy.tasks.length) {
      groupCopy.tasks = groupCopy.tasks.map((task) => ({
        ...task,
        id: "",
      }));
    }

    dispatch(addGroup(groupCopy, boardId));
  };

  const onSaveGroup = (group) => {
    if(group.id) dispatch(saveGroup(group, boardId));
    else dispatch(addGroup(group, boardId));
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <section className="board">
      <h1>{board.title}</h1>
      <GroupList
        onRemoveGroup={onRemoveGroup}
        onBoardUpdate={onBoardUpdate}
        onDuplicateGroup={onDuplicateGroup}
        onSaveGroup={onSaveGroup}
        groups={board.groups}
      />
    </section>
  );
}
