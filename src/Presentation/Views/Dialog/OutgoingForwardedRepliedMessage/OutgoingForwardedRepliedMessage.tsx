import React, { useState } from 'react';
import './OutgoingForwardedRepliedMessage.scss';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import ForwardFilled from '../../../components/UI/svgs/Icons/Actions/ForwardFilled';
import ReplyFilled from '../../../components/UI/svgs/Icons/Actions/ReplyFilled';
import MessageContextMenu from '../ContextMenu/MessageContextMenu/MessageContextMenu';
import UiKitTheme from '../../../themes/UiKitTheme';
import { FunctionTypeMessageEntityToVoid } from '../../../../CommonTypes/BaseViewModel';
import MessageContentComponent from '../IncomingMessage/MessageContentComponent/MessageContentComponent';

function OutgoingForwardedRepliedMessage(props: {
  theme: UiKitTheme | undefined;
  messages: MessageEntity[];
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  repliedUserName: string;
  renderOringinalMessage: React.ReactNode;
  typeMessage: string;
  enableForwarding: boolean;
  enableReplying: boolean;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [haveHover, setHaveHover] = useState(false);

  const disableMenu = !props.enableForwarding && !props.enableReplying;

  return (
    <div>
      <div
        className="outgoing-replied-text-message"
        onMouseEnter={() => setHaveHover(true)}
        onMouseLeave={() => setHaveHover(false)}
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <div className="outgoing-replied-text-message-info">
          <div className="outgoing-replied-text-message-info-name">
            <div className="outgoing-replied-text-message-info-name-caption">
              <div className="outgoing-replied-text-message-info-name-caption-reply">
                <div className="outgoing-replied-text-message-info-name-caption-reply-icon">
                  {props.typeMessage === 'forward' ? (
                    <ForwardFilled
                      width="16"
                      height="16"
                      color="var(--caption)"
                    />
                  ) : (
                    <ReplyFilled
                      width="16"
                      height="16"
                      color="var(--caption)"
                    />
                  )}
                </div>
                <div className="outgoing-replied-text-message-info-name-caption-reply-to-name">
                  {props.typeMessage === 'forward'
                    ? `Forwarded from ${props.repliedUserName}`
                    : `Replied to ${props.repliedUserName}`}
                </div>
              </div>
            </div>
          </div>
          {props.messages.map((item) => (
            <div className="message-view-container--outgoing-message-wrapper--message">
              <div className="message-view-container--outgoing-message-wrapper--context-menu">
                {haveHover && !disableMenu ? (
                  <MessageContextMenu
                    theme={props.theme}
                    message={item}
                    onReply={props.onReply}
                    onForward={props.onForward}
                    enableReplying={props.enableReplying}
                    enableForwarding={props.enableForwarding}
                  />
                ) : null}
              </div>
              <div className="outgoing-replied-text-message-info-message-bubble">
                <div className="outgoing-replied-text-message-info-message-line">
                  <MessageContentComponent
                    theme={props.theme}
                    mc={item}
                    originalTextMessage
                    widgetTextContent=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {props.renderOringinalMessage}
    </div>
    // <div>
    //     <div className="incoming-replied-text-message">
    //         <div className="incoming-replied-text-message-avatar" />
    //         <div className="incoming-replied-text-message-info">
    //             <div className="incoming-replied-text-message-info-name">
    //                 <div className="incoming-replied-text-message-info-name-caption">
    //                     <div className="incoming-replied-text-message-info-name-caption-reply">
    //                         <div className="incoming-replied-text-message-info-name-caption-reply-icon">
    //                             {props.typeMessage === 'forward' ? (
    //                                 <ForwardFilled
    //                                     width="16"
    //                                     height="16"
    //                                     color="var(--caption)"
    //                                 />
    //                             ) : (
    //                                 <ReplyFilled
    //                                     width="16"
    //                                     height="16"
    //                                     color="var(--caption)"
    //                                 />
    //                             )}
    //                         </div>
    //                         <div className="incoming-replied-text-message-info-name-caption-reply-to-name">
    //                             {props.typeMessage === 'forward'
    //                                 ? `Forwarded from ${props.repliedUserName}`
    //                                 : `Replied to ${props.repliedUserName}`}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             {props.messages.map((item) => (
    //                 <div className="incoming-replied-text-message-info-message">
    //                     <div className="incoming-replied-text-message-info-message-bubble">
    //                         <div className="incoming-replied-text-message-info-message-line">
    //                             {item.message}
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    //     {props.renderOringinalMessage}
    // </div>
  );
}

export default OutgoingForwardedRepliedMessage;
