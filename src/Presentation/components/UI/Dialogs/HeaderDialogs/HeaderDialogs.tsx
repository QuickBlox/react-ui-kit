import React from 'react';
import './HeaderDialogs.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import stl from './HeaderDialogs.scss';
import Search from '../../svgs/Icons/Navigation/Search';
import NewChat from '../../svgs/Icons/Actions/NewChat';
import ActiveSvg from '../../svgs/ActiveSvg/ActiveSvg';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import UiKitTheme from '../../../../assets/UiKitTheme';

type HeaderDialogsProps = {
  title?: string;
  clickSearchHandler?: FunctionTypeVoidToVoid;
  touchSearchHandler?: FunctionTypeVoidToVoid;
  ClickActionHandler?: FunctionTypeVoidToVoid;
  TouchActionHandler?: FunctionTypeVoidToVoid;
  theme?: UiKitTheme;
  settings?: any;
};
// eslint-disable-next-line react/function-component-definition
const HeaderDialogs: React.FC<HeaderDialogsProps> = ({
  title,
  clickSearchHandler,
  touchSearchHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ClickActionHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TouchActionHandler,
  theme = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  settings = undefined,
}: HeaderDialogsProps) => {
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
    // <div className={[s1, s2].join(' ')}>
    //   <div className={s3}>
    //     <div>{title}</div>
    //   </div>
    //   <div className={s5}>
    //     <Search />
    //     <NewChat />
    //   </div>
    // </div>
    // className="header-dialogs-container__title"
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
          touchAction={() => {
            console.log('touchSearchDialogsHandler');
            if (touchSearchHandler) touchSearchHandler();
          }}
          clickAction={() => {
            console.log('clickSearchDialogsHandler');
            if (clickSearchHandler) clickSearchHandler();
          }}
        />
        <ActiveSvg
          content={<NewChat width="24" height="24" applyZoom />}
          touchAction={() => {
            console.log('touchAction: Hello from component 1');
            if (TouchActionHandler) TouchActionHandler();
          }}
          clickAction={() => {
            console.log('clickAction: Hello from component 2');
            if (ClickActionHandler) ClickActionHandler();
          }}
        />
      </div>
    </div>
  );
};

export default HeaderDialogs;
