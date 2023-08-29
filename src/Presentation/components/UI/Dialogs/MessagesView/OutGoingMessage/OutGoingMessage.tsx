import React from 'react';
import './OutGoingMessage.scss';
import { MessageEntity } from '../../../../../../Domain/entity/MessageEntity';
import UiKitTheme from '../../../../../assets/UiKitTheme';
import ViewedDelivered from '../../../svgs/Icons/Status/ViewedDelivered';
import SentStatusIcon from '../../../svgs/Icons/Status/Sent';
import { getTimeShort24hFormat } from '../../../../../../utils/DateTimeFormatter';

export function OutGoingMessage(props: {
  message: MessageEntity;
  theme: UiKitTheme | undefined;
  element: JSX.Element;
}) {
  // const [haveHover, setHaveHover] = useState(false);
  // const [openMenu, setOpenMenu] = useState(false);

  return (
    <div
      // onMouseEnter={() => setHaveHover(true)}
      // onMouseLeave={() => setHaveHover(false)}
      className="message-view-container--outgoing-message-wrapper"
    >
      {/* {haveHover || openMenu ? ( */}
      {/*  <div */}
      {/*    className="message-view-container--outgoing-message-wrapper--context-menu" */}
      {/*    // onClick={() => { */}
      {/*    //   setOpenMenu(!openMenu); */}
      {/*    // }} */}
      {/*  > */}
      {/*     <EditDots */}
      {/*      color={ */}
      {/*        props.theme */}
      {/*          ? props.theme.secondaryText() */}
      {/*          : 'var(--secondary-text)' */}
      {/*      } */}
      {/*     /> */}
      {/*    /!* {openMenu ? ( *!/ */}
      {/*    /!*  <DropDownMenu *!/ */}
      {/*    /!*    items={contextMessageMenu} *!/ */}
      {/*    /!*    itemsAI={contextMessageMenuAI} *!/ */}
      {/*    /!*  /> *!/ */}
      {/*    /!* ) : null} *!/ */}
      {/*  </div> */}
      {/* ) : */}
      <div className="message-view-container__status-message">
        <div className="message-view-container__incoming-time">
          {props.message.delivered_ids &&
          props.message.delivered_ids.length > 0 ? (
            <ViewedDelivered
              width="13"
              height="13"
              applyZoom
              color={
                props.theme
                  ? props.theme.mainElements()
                  : 'var(--main-elements)'
              }
            />
          ) : (
            <SentStatusIcon
              width="13"
              height="13"
              applyZoom
              color={
                props.theme
                  ? props.theme.mainElements()
                  : 'var(--main-elements)'
              }
            />
          )}
        </div>
        <div
          style={
            props.theme
              ? { color: props.theme ? props.theme.mainText() : '' }
              : {}
          }
          className="message-view-container__incoming-time"
        >
          {getTimeShort24hFormat(props.message.date_sent)}
        </div>
      </div>
      {/* )} */}
      <div
        style={
          props.theme
            ? {
                color: props.theme.mainText(),
                backgroundColor: props.theme.outgoingBackground(),
              }
            : {}
        }
        className="message-view-container__outgoing-message"
      >
        {props.element}
      </div>
    </div>
  );
}
