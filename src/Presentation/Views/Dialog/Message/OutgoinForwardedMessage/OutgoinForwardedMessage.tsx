import React, { useState } from 'react';
import './OutgoinForwardedMessage.scss';
import UiKitTheme from '../../../../themes/UiKitTheme';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { FunctionTypeMessageEntityToVoid } from '../../../../../CommonTypes/BaseViewModel';
import MessageContextMenu from '../MessageContextMenu/MessageContextMenu';
import ViewedDelivered from '../../../../components/UI/svgs/Icons/Status/ViewedDelivered';
import SentStatusIcon from '../../../../components/UI/svgs/Icons/Status/Sent';
import ForwardFilled from '../../../../components/UI/svgs/Icons/Actions/ForwardFilled';
import MessageContentComponent from '../IncomingMessage/MessageContentComponent/MessageContentComponent';
import { FileType } from '../../../../../Domain/entity/FileTypes';

function OutgoingForwardedMessage(props: {
  theme: UiKitTheme | undefined;
  messages: MessageEntity[];
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  repliedUserName: string;
  renderOringinalMessage: React.ReactNode;
  date_sent: string;
  status_message: number;
  enableForwarding: boolean;
  enableReplying: boolean;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  // const [haveHover, setHaveHover] = useState(false);

  const disableMenu = !props.enableForwarding && !props.enableReplying;

  return (
    <div>
      {props.messages.map((item) => (
        <div
          className="outgoing-forwarded-message"
          // onMouseEnter={() => setHaveHover(true)}
          // onMouseLeave={() => setHaveHover(false)}
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <div className="outgoing-forward-message-caption">
            <div className="outgoing-forward-message-caption-status">
              {props.status_message ? (
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
          <div className="outgoing-forward-message-caption-time">
            {props.date_sent}
          </div>
          <div className="outgoing-forward-message-func">
            {
              // haveHover &&
              !disableMenu ? (
                <MessageContextMenu
                  theme={props.theme}
                  message={item}
                  onReply={props.onReply}
                  onForward={props.onForward}
                  enableReplying={props.enableReplying}
                  enableForwarding={props.enableForwarding}
                />
              ) : null
            }
          </div>
          <div className="outgoing-forwarded-message-data">
            <div className="outgoing-forwarded-message-name">
              <div className="outgoing-forwarded-message-caption">
                <div className="outgoing-forwarded-message-caption-forward">
                  <div className="outgoing-forwarded-message-caption-forward-icon">
                    <ForwardFilled
                      width="16"
                      height="16"
                      color="var(--caption)"
                    />
                  </div>
                  <div className="outgoing-forwarded-message-caption-forward-from-name">{`Forwarded from ${props.repliedUserName}`}</div>
                </div>
              </div>
            </div>
            <div
              className="outgoing-forwarded-message-chat-bubble-background"
              style={{
                background:
                  item.attachments &&
                  (item.attachments[0].type
                    .toString()
                    .includes(FileType.image) ||
                    item.attachments[0].type
                      .toString()
                      .includes(FileType.video))
                    ? 'none'
                    : undefined,
              }}
            >
              <div className="outgoing-forwarded-message-single-line">
                <MessageContentComponent
                  theme={props.theme}
                  messageEntity={item}
                  originalTextMessage
                  widgetTextContent=""
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {props.renderOringinalMessage}
    </div>
  );
}

export default OutgoingForwardedMessage;
