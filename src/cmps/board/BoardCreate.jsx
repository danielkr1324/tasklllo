
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../costumeHooks/useClickOutside';
import { addBoard } from '../../store/actions/board.actions';
import { boardService } from '../../services/board.service';

export function BoardCreate({ closeBoardComposer, refDataBtn }) {
  const dispatch = useDispatch();
  const [boardToEdit, setBoardToEdit] = useState({});
  const navigate = useNavigate();

  const modalRef = useRef(null);
  const [modalStyle, setModalStyle] = useState(false);
  const [modalHeight, setModalHeight] = useState();

  useEffect(() => {
    loadBoardCreate()
  }, [modalStyle]);

  async function loadBoardCreate() {
    const board = await boardService.getEmptyBoard()
    setModalStyle(true);
    setModalHeight(modalRef.current.getBoundingClientRect().height);
    setBoardToEdit(board)
  }

  function getModalPos(refDataBtn) {
    const rect = refDataBtn.current.getBoundingClientRect();
    let modalPos = {};

    if (rect.y > 10) {
      let topModal = rect.top + rect.height + 10;
      let bottomModal = '';
      let leftModal = rect.right + 5;
      let rightModal = '';
      let position = 'fixed';

      if (window.innerHeight < rect.top + modalHeight) {
        topModal = '';
        bottomModal = 10;
      }

      if (window.innerWidth < rect.left + 304) {
        leftModal = '';
        rightModal = 20;
      }

      modalPos = {
        bottom: bottomModal,
        top: topModal,
        left: leftModal,
        right: rightModal,
        position: position,
      };
    } else {
      let topModal = rect.top + rect.height + 10;
      let bottomModal = '';
      let leftModal = rect.left;
      let rightModal = rect.right;
      let position = 'fixed';

      if (window.innerHeight < rect.top + modalHeight) {
        topModal = '';
        bottomModal = 10;
      }

      if (window.innerWidth < rect.left + 304) {
        leftModal = '';
        rightModal = 20;
      }

      modalPos = {
        bottom: bottomModal,
        top: topModal,
        left: leftModal,
        right: rightModal,
        position: position,
      };
    }

    return modalPos;
  }

  useClickOutside(modalRef, closeBoardComposer);

  const bgImgs = [
    {
        backgroundColor: '#d9d9d9',
        background:
            'https://images.unsplash.com/photo-1672091161606-71d1cf383221?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80',
        thumbnail:
            'https://images.unsplash.com/photo-1672091161606-71d1cf383221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',
    },
    {
        backgroundColor: '#262626',
        background:
            'https://images.unsplash.com/photo-1672167630747-35dd70a83994?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80',
        thumbnail:
            'https://images.unsplash.com/photo-1672167630747-35dd70a83994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',
    },
    {
        backgroundColor: '#f3f3d9',
        background:
            'https://images.unsplash.com/photo-1673212815770-16f0a1f1500f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80',
        thumbnail:
            'https://images.unsplash.com/photo-1673212815770-16f0a1f1500f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',
    },
    {
        backgroundColor: '#d9d9d9',
        background:
            'https://images.unsplash.com/photo-1673725437336-e2f3307cebbf?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80',
        thumbnail:
            'https://images.unsplash.com/photo-1673725437336-e2f3307cebbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',
    },
  ];

  const bgClrs = [
    '#0079bf',
    '#d29034',
    '#519839',
    '#b04632',
    '#89609e',
    '#cd5a91',
  ];

  const [backgroundColor, setBackgroundColor] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(bgImgs[0].thumbnail);

  function handleNewBoard({ target }) {
    let { value, name: field } = target;
    setBoardToEdit((prevBoard) => ({ ...prevBoard, [field]: value }));
  }

  const setBoardBackground = (backgroundColor, backgroundImage) => {
    setBackgroundColor(backgroundColor);
    setBackgroundImage(backgroundImage);
    let style = backgroundImage
      ? bgImgs.find((bgImg) => bgImg.thumbnail === backgroundImage)
      : { backgroundColor };
    setBoardToEdit((prevBoard) => ({ ...prevBoard, style }));
  };

  async function onCreateBoard(ev) {
    ev.preventDefault();
    if (!boardToEdit.title) return;
    try {
      const newBoard = await dispatch(addBoard(boardToEdit));
      closeBoardComposer();
      setBoardToEdit(boardService.getEmptyBoard());
      navigate(`/board/${newBoard._id}`);
    } catch (err) {
      console.log('Failed to save new board', err);
    }
  }

  return (
    <section
      className="create-board-composer"
      ref={modalRef}
      style={getModalPos(refDataBtn)}
    >
      <div className="create-board-composer-header">
        <h2>Create board</h2>
        <button
          className="btn-board-composer close"
          onClick={closeBoardComposer}
        >
          {/* Close button content */}
        </button>
      </div>

      <div className="create-board-bg-picker">
        {/* Background pickers */}
      </div>

      <form>
        <label className="create-board-label">Board title</label>
        <input
          type="text"
          name="title"
          maxLength="512"
          value={boardToEdit.title}
          onChange={handleNewBoard}
        />
        <button className="btn-board-composer create" onClick={onCreateBoard}>
          Create
        </button>
      </form>
    </section>
  );
}
