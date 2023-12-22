import React, { useRef, useEffect, useState } from 'react';
import './DesktopLayout.scss';
import UiKitTheme from '../../themes/UiKitTheme';

type LayoutItems = {
  dialogsView: React.ReactNode;
  dialogMessagesView: React.ReactNode;
  dialogInfoView: React.ReactNode;
  theme?: UiKitTheme;
  mainContainerStyles?: React.CSSProperties;
  onHeightChange?: (height: number) => void;
};

function DesktopLayout({
  dialogsView,
  dialogMessagesView,
  dialogInfoView,
  theme = undefined,
  onHeightChange,
  mainContainerStyles = {},
}: LayoutItems) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  const handleResize = () => {
    if (containerRef.current) {
      const newHeight = containerRef.current.offsetHeight;

      if (newHeight !== height) {
        setHeight(newHeight);
        if (onHeightChange) {
          onHeightChange(newHeight);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [height, onHeightChange]);

  const columnContainerStyles = theme
    ? {
        color: theme.mainText(),
        backgroundColor: theme.mainBackground(),
        // border: `1px solid ${theme.divider()}`,
      }
    : {};

  return (
    <div
      ref={containerRef}
      style={mainContainerStyles}
      className="desktop-layout-main-container"
    >
      {dialogsView && (
        <div
          style={columnContainerStyles}
          className="desktop-layout-main-container__item-left"
        >
          {dialogsView}
        </div>
      )}
      {dialogMessagesView && (
        <div
          style={columnContainerStyles}
          className="desktop-layout-main-container__item-center"
        >
          {dialogMessagesView}
        </div>
      )}
      {dialogInfoView && (
        <div
          style={columnContainerStyles}
          className="desktop-layout-main-container__item-right"
        >
          {dialogInfoView}
        </div>
      )}
    </div>
  );
}

export default DesktopLayout;
