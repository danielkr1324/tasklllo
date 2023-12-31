
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../costumeHooks/useClickOutside';
import { addBoard } from '../../store/actions/board.actions';
import { boardService } from '../../services/board.service';

export function BoardCreate({ closeBoardComposer, refDataBtn }) {
  const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard());
  const loggedinUser = useSelector(storeState => storeState.userModule.user)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalRef = useRef(null);

  useEffect(() => {
    setBoardToEdit(prevBoard => ({...prevBoard, createdBy: loggedinUser, members: [loggedinUser]}))
  }, []);


  function getModalPos(refDataBtn) {
    const rect = refDataBtn.current.getBoundingClientRect();
    const modalPos = {};
    const modalHeight = 300
  
    let topModal = rect.top + rect.height + 10;
    let bottomModal = '';
    let leftModal = rect.left;
    let rightModal = rect.right;
    let position = 'fixed';
  
    if (rect.y <= 10) {
      topModal = rect.top + rect.height + 10;
    } else if (window.innerHeight < rect.top + modalHeight) {
      bottomModal = 10;
    }
  
    if (window.innerWidth < rect.left + 304) {
      leftModal = '';
      rightModal = 20;
    }
  
    modalPos.top = topModal;
    modalPos.bottom = bottomModal;
    modalPos.left = leftModal;
    modalPos.right = rightModal;
    modalPos.position = position;
  
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
      
      const boardToAdd = await dispatch(addBoard(boardToEdit));
      closeBoardComposer();
      setBoardToEdit(boardService.getEmptyBoard());
      navigate(`/board/${boardToAdd._id}`);
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
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="create-board-bg-picker">
      <label className="create-board-label">Background</label>
				<div className="bg-img-picker">
					<ul className="clean-list bg-imgs-list">
						{bgImgs.map((bgImg) => (
							<li key={bgImg.thumbnail} className="li-bg-img">
								<button
									className="btn-bg bg-img"
									title="Custom image"
									onClick={() => setBoardBackground(undefined, bgImg.thumbnail)}
									style={{ backgroundImage: 'url(' + bgImg.thumbnail + ')' }}
								>
									{backgroundImage === bgImg.thumbnail && (
										<div className="selected-bg">
                      <i className="fa-solid fa-check"></i>
										</div>
									)}
									<span className="bg-preview-fade"></span>
								</button>
							</li>
						))}
					</ul>
				</div>

				<div className="bg-clr-picker">
					<ul className="clean-list bg-clrs-list">
						{bgClrs.map((bgClr) => (
							<li key={bgClr} className="li-bg-clr">
								<button
									className="btn-bg bg-img"
									onClick={() => setBoardBackground(bgClr, undefined)}
									style={{ backgroundColor: bgClr }}
								>
									{backgroundColor === bgClr && (
										<div className="selected-bg">
                      <i className="fa-solid fa-check"></i>
										</div>
									)}
									<span className="bg-preview-fade"></span>
								</button>
							</li>
						))}
					</ul>
				</div>
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
