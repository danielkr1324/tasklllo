import React, { useRef, useState } from 'react';
import { SideMenuBgOptions } from './side-menu-background/SideMenuBgOptions';
import { SideMenuColors } from './side-menu-background/SideMenuColors';
import { SideMenuMain } from './SideMenuMain';
import { SideMenuPhotos } from './side-menu-background/SideMenuPhotos';
import { useClickOutside } from '../../../costumeHooks/useClickOutside';

export function BoardSideMenu({
  onToggleSideMenu,
  changeBackground,
  isAdmin,
  onRemoveBoard,
}) {
  const [title, setTitle] = useState('Menu');
  const modalRef = useRef();
  useClickOutside(modalRef, onToggleSideMenu);

  function onChangeTitle(title) {
    setTitle(title);
  }

  function getCmp() {
    switch (title) {
      case 'Menu':
        return (
          <SideMenuMain
            onChangeTitle={onChangeTitle}
            isAdmin={isAdmin}
            onRemoveBoard={onRemoveBoard}
          />
        );
      case 'Change background':
        return <SideMenuBgOptions onChangeTitle={onChangeTitle} />;
      case 'Colors':
        return <SideMenuColors changeBackground={changeBackground} />;
      case 'Photos by':
        return <SideMenuPhotos changeBackground={changeBackground} />;
      default:
        return null;
    }
  }

  function onGoBack() {
    switch (title) {
      case 'Change background':
        setTitle('Menu');
        break;
      case 'Colors':
      case 'Photos by':
        setTitle('Change background');
        break;
      default: 
        return
    }
  }

  return (
    <section className="board-side-menu" ref={modalRef}>
      <div className="board-side-menu-header">
        {title !== 'Menu' && (
          <a className="board-side-menu-header-go-back" onClick={onGoBack}>
            <i className="fa-solid fa-chevron-left"></i>
          </a>
        )}
        <h3 className="board-side-menu-header-title">
          {title === 'Photos by' ? (
            <>
              {title}{' '}
              <a
                className="header-unsplash-link"
                href="https://unsplash.com/"
                target="_blank"
                rel="noreferrer"
              >
                Unsplash
              </a>
            </>
          ) : (
            title
          )}
        </h3>
        <a className="board-side-menu-header-cancel" onClick={onToggleSideMenu}>
          <i className="fa-solid fa-xmark"></i>
        </a>
      </div>
      <div className="board-side-menu-content">{getCmp()}</div>
    </section>
  );
}
