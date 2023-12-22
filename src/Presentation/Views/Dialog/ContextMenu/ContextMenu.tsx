import React, { useState, CSSProperties, useRef, useEffect } from 'react';
import './ContextMenu.scss';
import EditDots from '../../../components/UI/svgs/Icons/Actions/EditDots';

type MenuItem = {
  title: string;
  action: () => void;
};

type ContextMenuProps = {
  widgetToRender?: JSX.Element;
  items?: MenuItem[];
};

const ContextMenuStyles: { [key: string]: CSSProperties } = {
  contextMenuIcon: {
    cursor: 'pointer',
  },
  contextMenuContent: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    border: '1px solid gray',
    borderRadius: '8px',
    padding: '4px',
    zIndex: 1,
    width: 'max-content',
  },
};

function ContextMenu({ items, widgetToRender }: ContextMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    setMenuVisible(false); // Закрыть контекстное меню после клика на пункт меню
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setMenuVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        ...ContextMenuStyles.contextMenuIcon,
      }}
    >
      <div onClick={handleClick}>{widgetToRender || <EditDots />}</div>
      {menuVisible && (
        <div ref={contextMenuRef} className="context-menu">
          {items?.map((item, index) => (
            <div
              className="context-menu-item"
              key={index}
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                handleMenuItemClick(item.action);
              }}
            >
              <div className="context-menu-item-reply">{item.title}</div>
              <div className="context-menu-item-icon" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContextMenu;
