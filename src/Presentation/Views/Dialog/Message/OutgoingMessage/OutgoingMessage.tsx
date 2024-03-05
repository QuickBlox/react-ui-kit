import React, { useState } from 'react';
import './OutgoingMessage.scss';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import UiKitTheme from '../../../../themes/UiKitTheme';
import ViewedDelivered from '../../../../components/UI/svgs/Icons/Status/ViewedDelivered';
import SentStatusIcon from '../../../../components/UI/svgs/Icons/Status/Sent';
import { FunctionTypeMessageEntityToVoid } from '../../../../../CommonTypes/BaseViewModel';
import MessageContextMenu from '../MessageContextMenu/MessageContextMenu';
import { FileType } from '../../../../../Domain/entity/FileTypes';

export function OutgoingMessage(props: {
  message: MessageEntity;
  date_sent: string;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  theme: UiKitTheme | undefined;
  element: JSX.Element;
  enableForwarding: boolean;
  enableReplying: boolean;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  // const [haveHover, setHaveHover] = useState(false);

  const disableMenu = !props.enableForwarding && !props.enableReplying;

  return (
    <div>
      <div
        className="outgoing-message"
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <div className="outgoing-message-caption">
          <div className="outgoing-message-caption-status">
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
        </div>
        <div className="outgoing-message-caption-time">{props.date_sent}</div>
        <div className="outgoing-message-func">
          {
            // haveHover &&
            !disableMenu ? (
              <MessageContextMenu
                theme={props.theme}
                message={props.message}
                onReply={props.onReply}
                onForward={props.onForward}
                enableReplying={props.enableReplying}
                enableForwarding={props.enableForwarding}
              />
            ) : null
          }
        </div>
        <div className="outgoing-message-data">
          <div className="outgoing-message-name">
            <div className="outgoing-message-caption" />
          </div>
          <div
            className="outgoing-message-chat-bubble-background"
            style={{
              // todo: need refactoring this, should use only item.attachments[0].type
              background:
                props.message.attachments &&
                (props.message.attachments[0].type
                  .toString()
                  .includes(FileType.image) ||
                  props.message.attachments[0].type
                    .toString()
                    .includes(FileType.video))
                  ? 'none'
                  : undefined,
            }}
          >
            <div className="outgoing-message-single-line">{props.element}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
