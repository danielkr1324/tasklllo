import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadBoards,  updateBoards } from '../store/actions/board.actions';
import { loadUsers } from '../store/actions/user.actions';
import { BoardPreview } from '../cmps/board/BoardPreview';
import Loader from '../assets/images/loader.svg';


export function Workspace() {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boardModule.boards);
  const loggedinUser = useSelector(state => state.userModule.user)

  useEffect(() => {
    dispatch(loadUsers())
  })
  

  useEffect(() => {
    dispatch(loadBoards(loggedinUser._id))
  }, [loggedinUser._id]);


  const getStarredBoards = () => boards.filter(board => board.isStarred);

  const onToggleStar = async (event, board) => {
    event.stopPropagation();
    event.preventDefault();
    const updatedBoard = { ...board, isStarred: !board.isStarred };
    try {
      dispatch(updateBoards(updatedBoard));
    } catch (err) {
      console.log('Cannot update board', err);
    }
  };

  if (!boards || !loggedinUser) {
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
    </ul>
  );

  return (
    <section className="workspace-section">
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
        </div> 
        
      </div>
    </section>
  );
}

