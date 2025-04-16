import React from 'react';
import './DialogListHeader.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import stl from './DialogListHeader.scss';
import Search from '../../components/UI/svgs/Icons/Navigation/Search';
import NewChat from '../../components/UI/svgs/Icons/Actions/NewChat';
import ActiveSvg from '../../components/UI/svgs/ActiveSvg/ActiveSvg';
import { FunctionTypeVoidToVoid } from '../../../CommonTypes/BaseViewModel';
import UiKitTheme from '../../themes/UiKitTheme';

type DialogListHeaderProps = {
  title?: string;
  clickSearchHandler?: FunctionTypeVoidToVoid;
  touchSearchHandler?: FunctionTypeVoidToVoid;
  clickActionHandler?: FunctionTypeVoidToVoid;
  touchActionHandler?: FunctionTypeVoidToVoid;
  theme?: UiKitTheme;
  settings?: any;
};
// eslint-disable-next-line react/function-component-definition
const DialogListHeader = ({
  title,
  clickSearchHandler,
  touchSearchHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clickActionHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  touchActionHandler,
  theme = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  settings = undefined,
}: DialogListHeaderProps) => {
  // const s1 = stl.headerDialogsContainer;
  // const s2 = stl.headerDialogs;
  // const s3 = stl.headerDialogsContainerTitle_wrapper;
  // // const s4 = stl.headerDialogsContainer__title;
  // const s5 = stl.headerDialogsContainer__buttons;
  //
  // s5.color = '#FF3B30';
  const titleContainerStyle = theme
    ? {
        border: `1px solid ${theme.divider()}`,
        backgroundColor: theme.mainBackground(),
      }
    : {};
  const textStyle = theme
    ? {
        color: theme.mainText(),
        fontFamily: theme.fontFamily(),
        backgroundColor: theme.mainBackground(),
      }
    : {};
  const buttonsStyle = {
    background: 'none',
    svg: {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      path: {
        fill: theme?.mainElements(),
      },
    },
  };

  return (
    <div
      className="header-dialogs-container header-dialogs"
      style={titleContainerStyle}
    >
      <div className="header-dialogs-container--title_wrapper">
        <div style={textStyle}>{title}</div>
      </div>
      <div style={buttonsStyle} className="header-dialogs-container__buttons">
        <ActiveSvg
          content={<Search width="24" height="24" applyZoom />}
          onTouch={touchSearchHandler}
          onClick={clickSearchHandler}
        />
        <ActiveSvg
          content={<NewChat width="24" height="24" applyZoom />}
          onTouch={touchActionHandler}
          onClick={clickActionHandler}
        />
      </div>
    </div>
  );
};

export default DialogListHeader;
