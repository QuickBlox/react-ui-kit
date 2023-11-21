import React, { useState } from 'react';
import './OutgoingMessage.scss';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import UiKitTheme from '../../../themes/UiKitTheme';
import ViewedDelivered from '../../../components/UI/svgs/Icons/Status/ViewedDelivered';
import SentStatusIcon from '../../../components/UI/svgs/Icons/Status/Sent';
import { getTimeShort24hFormat } from '../../../../utils/DateTimeFormatter';
import { FunctionTypeMessageEntityToVoid } from '../../../../CommonTypes/BaseViewModel';
import MessageContextMenu from '../ContextMenu/MessageContextMenu/MessageContextMenu';

export function OutgoingMessage(props: {
  message: MessageEntity;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  theme: UiKitTheme | undefined;
  element: JSX.Element;
  enableForwarding: boolean;
  enableReplying: boolean;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [haveHover, setHaveHover] = useState(false);

  const disableMenu = !props.enableForwarding && !props.enableReplying;

  return (
    <div
      onMouseEnter={() => setHaveHover(true)}
      onMouseLeave={() => setHaveHover(false)}
      className="message-view-container--outgoing-message-wrapper"
      onClick={() => {
        setOpenMenu(!openMenu);
      }}
    >
      <div className="message-view-container--outgoing-message-wrapper--context-menu">
        {haveHover && !disableMenu ? (
          <MessageContextMenu
            theme={props.theme}
            message={props.message}
            onReply={props.onReply}
            onForward={props.onForward}
            enableReplying={props.enableReplying}
            enableForwarding={props.enableForwarding}
          />
        ) : null}
      </div>
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
        <div className="message-in-a-single-line">{props.element}</div>
      </div>
    </div>
  );
}
