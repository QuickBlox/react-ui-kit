import React, { useState } from 'react';
import './OutgoingRepliedMessage.scss';
import MessageContentComponent from '../IncomingMessage/MessageContentComponent/MessageContentComponent';
import UiKitTheme from '../../../../themes/UiKitTheme';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { FunctionTypeMessageEntityToVoid } from '../../../../../CommonTypes/BaseViewModel';
import ReplyFilled from '../../../../components/UI/svgs/Icons/Actions/ReplyFilled';
import MessageContextMenu from '../MessageContextMenu/MessageContextMenu';

function OutgoingRepliedMessage(props: {
  theme: UiKitTheme | undefined;
  messages: MessageEntity[];
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  repliedUserName: string;
  renderOringinalMessage: React.ReactNode;
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
          className="outgoing-replied-message"
          // onMouseEnter={() => setHaveHover(true)}
          // onMouseLeave={() => setHaveHover(false)}
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <div className="outgoing-replied-message-func">
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
          <div className="outgoing-replied-message-caption">
            <div className="outgoing-replied-message-caption-status">
              {/* {props.status_message ? ( */}
              {/*  <ViewedDelivered */}
              {/*    width="13" */}
              {/*    height="13" */}
              {/*    applyZoom */}
              {/*    color={ */}
              {/*      props.theme */}
              {/*        ? props.theme.mainElements() */}
              {/*        : 'var(--main-elements)' */}
              {/*    } */}
              {/*  /> */}
              {/* ) : ( */}
              {/*  <SentStatusIcon */}
              {/*    width="13" */}
              {/*    height="13" */}
              {/*    applyZoom */}
              {/*    color={ */}
              {/*      props.theme */}
              {/*        ? props.theme.mainElements() */}
              {/*        : 'var(--main-elements)' */}
              {/*    } */}
              {/*  /> */}
              {/* )} */}
            </div>
          </div>
          {/* <div className="outgoing-replied-message-caption-time"> */}
          {/*  {props.date_sent} */}
          {/* </div> */}
          <div className="outgoing-replied-message-data">
            <div className="outgoing-replied-message-name">
              <div className="outgoing-replied-message-caption">
                <div className="outgoing-replied-message-caption-replied">
                  <div className="outgoing-replied-message-caption-replied-icon">
                    <ReplyFilled
                      width="16"
                      height="16"
                      color="var(--caption)"
                    />
                  </div>
                  <div className="outgoing-replied-message-caption-replied-from-name">{`Replied to ${props.repliedUserName}`}</div>
                </div>
              </div>
            </div>
            <div className="outgoing-replied-message-chat-bubble-background">
              <div className="outgoing-replied-message-single-line">
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
    // <div>
    //   <div
    //     className="outgoing-replied-text-message"
    //     // onMouseEnter={() => setHaveHover(true)}
    //     // onMouseLeave={() => setHaveHover(false)}
    //     onClick={() => {
    //       setOpenMenu(!openMenu);
    //     }}
    //   >
    //     <div className="outgoing-replied-text-message-info">
    //       <div className="outgoing-replied-text-message-info-name">
    //         <div className="outgoing-replied-text-message-info-name-caption">
    //           <div className="outgoing-replied-text-message-info-name-caption-reply">
    //             <div className="outgoing-replied-text-message-info-name-caption-reply-icon">
    //               <ReplyFilled width="16" height="16" color="var(--caption)" />
    //             </div>
    //             <div className="outgoing-replied-text-message-info-name-caption-reply-to-name">
    //               {`Replied to ${props.repliedUserName}`}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {props.messages.map((item) => (
    //         <div className="message-view-container--outgoing-message-wrapper--message">
    //           <div className="message-view-container--outgoing-message-wrapper--context-menu">
    //             {
    //               // haveHover &&
    //               !disableMenu ? (
    //                 <MessageContextMenu
    //                   theme={props.theme}
    //                   message={item}
    //                   onReply={props.onReply}
    //                   onForward={props.onForward}
    //                   enableReplying={props.enableReplying}
    //                   enableForwarding={props.enableForwarding}
    //                 />
    //               ) : null
    //             }
    //           </div>
    //           <div className="time">11:125</div>
    //           <div className="outgoing-replied-text-message-info-message-bubble">
    //             <div className="outgoing-replied-text-message-info-message-line">
    //               <MessageContentComponent
    //                 theme={props.theme}
    //                 messageEntity={item}
    //                 originalTextMessage
    //                 widgetTextContent=""
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   {props.renderOringinalMessage}
    // </div>
  );
}

export default OutgoingRepliedMessage;
