import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadBoards, updateBoard } from '../store/actions/board.actions';
import { logout } from '../store/actions/user.actions';
import { BoardCreate } from '../cmps/board/BoardCreate';
import { BoardPreview } from '../cmps/board/BoardPreview';
import Loader from '../assets/images/loader.svg';
import { useNavigate } from 'react-router';

export function Workspace() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(state => state.boardModule.boards);
  const loggedinUser = useSelector(state => state.userModule.user)
  const [isBoardComposerOpen, setIsBoardComposerOpen] = useState(false);
  const createBtnRef = useRef();

  useEffect(() => {
    dispatch(loadBoards(loggedinUser._id));

  });

  const openBoardComposer = () => {
    setIsBoardComposerOpen(true);
  };

  const closeBoardComposer = () => {
    setIsBoardComposerOpen(false);
  };

  const getStarredBoards = () => boards.filter(board => board.isStarred);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const onToggleStar = async (event, board) => {
    event.stopPropagation();
    event.preventDefault();
    const updatedBoard = { ...board, isStarred: !board.isStarred };
    try {
      await dispatch(updateBoard(updatedBoard));
      dispatch(loadBoards(loggedinUser._id));
    } catch (err) {
      console.log('Cannot update board', err);
    }
  };

  if (!boards) {
    return (
      <div className="loader-wrapper">
        <img className="loader" src={Loader} alt="loader" />
      </div>
    );
  }

  const starredBoards = getStarredBoards();

  const renderBoardList = boardList => (
    <ul className="board-list clean-list">
      {boardList.map(board => (
        <li key={board._id}>
          <a href={`/#/board/${board._id}`}>
            <BoardPreview board={board} onToggleStar={onToggleStar} />
          </a>
        </li>
      ))}
      <li
          className="board-preview create-new-board clean-list"
          onClick={openBoardComposer}
          key="001"
          ref={createBtnRef}
        >
          <span>Create new board</span>
        </li>
    </ul>
  );

  return (
    <section className="workspace-section">
      <button onClick={handleLogout}>Log out</button>


      {starredBoards.length !== 0 && (
        <div className="starred-boards">
          <div className="boards-section-header">
            <div className="boards-section-header-name">
              <h3> <i className="fa-regular fa-user"></i> Starred boards</h3>
            </div>
          </div>
          {renderBoardList(starredBoards)}
        </div>
      )}

      <div className="my-boards">
        <div className="boards-section-header">
          <div className="boards-section-header-name">
            <h3><i className="fa-regular fa-user"></i>Your boards</h3>
          </div>
        </div>

        <div>
          {renderBoardList(boards)}
          {isBoardComposerOpen && <BoardCreate closeBoardComposer={closeBoardComposer} refDataBtn={createBtnRef} />}
        </div> 
        
      </div>
    </section>
  );
}

