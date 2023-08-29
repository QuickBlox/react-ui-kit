import React, { useState, CSSProperties, useRef, useEffect } from 'react';
import './AIWidgetActions.scss';
import EditDots from '../../../../svgs/Icons/Actions/EditDots';

type MenuItem = {
  title: string;
  icon?: JSX.Element; // Добавлено поле для иконки пункта меню
  action: () => void;
};

type ContextMenuProps = {
  widgetToRender?: JSX.Element;
  items?: MenuItem[];
  title?: string | null;
};

const ContextMenuStyles: { [key: string]: CSSProperties } = {
  contextMenuIcon: {
    display: 'inline-block',
    position: 'relative',
    maxWidth: '42px',
    maxHeight: '42px',
    cursor: 'pointer',
  },
  contextMenuContent: {
    position: 'absolute',
    bottom: '10px',
    right: '0',
    backgroundColor: 'white',
    border: '1px solid gray',
    borderRadius: '8px',
    padding: '4px',
    zIndex: 1,
    width: 'max-content',
  },
  menuItemContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    cursor: 'pointer',
    fontWeight: 'normal',
  },
  menuTitle: {
    padding: '4px',
    fontWeight: 'bold',
  },
};

function AIWidgetActions({
  items,
  widgetToRender,
  title = null,
}: ContextMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    setMenuVisible(false);
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
    <div style={ContextMenuStyles.contextMenuIcon}>
      <div onClick={handleClick}>{widgetToRender || <EditDots />}</div>
      {menuVisible && (
        // <div ref={contextMenuRef} style={ContextMenuStyles.contextMenuContent}>
        <div ref={contextMenuRef} className="dropdown-context-menu-tone">
          {title && <div style={ContextMenuStyles.menuTitle}>{title}</div>}
          {items?.map((item, index) => (
            <div
              key={index}
              // style={ContextMenuStyles.menuItemContainer}
              className="dropdown-context-menu-tone-menu-item"
              onClick={() => {
                handleMenuItemClick(item.action);
              }}
            >
              {item.icon && (
                <div className="dropdown-context-menu-tone-menu-item-icon">
                  {item.icon}
                </div>
              )}
              <div className="dropdown-context-menu-tone-menu-item-title">
                {item.title}
              </div>
              <div className="dropdown-context-menu-tone-menu-item-icon" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIWidgetActions;
