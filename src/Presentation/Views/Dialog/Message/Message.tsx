import React from 'react';
import {
  FunctionTypeBooleanToVoid,
  FunctionTypeMessageEntityToVoid,
  FunctionTypeStringToVoid,
} from '../../../../CommonTypes/BaseViewModel';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import { getTimeShort24hFormat } from '../../../../utils/DateTimeFormatter';
import { SystemMessageBanner } from '../SystemMessageBanner/SystemMessageBanner';
import UiKitTheme from '../../../themes/UiKitTheme';
import { UserEntity } from '../../../../Domain/entity/UserEntity';
import { AIMessageWidget } from '../AIWidgets/AIMessageWidget';
import {
  GetUserNameFct,
  IncomingMessage,
} from './IncomingMessage/IncomingMessage';
import IncomingForwardedMessage from './IncomingForwardedMessage/IncomingForwardedMessage';
import OutgoingRepliedMessage from './OutgoingRepliedMessage/OutgoingRepliedMessage';
import { OutgoingMessage } from './OutgoingMessage/OutgoingMessage';
import MessageContentComponent from './IncomingMessage/MessageContentComponent/MessageContentComponent';
import OutgoingForwardedMessage from './OutgoinForwardedMessage/OutgoinForwardedMessage';
import IncomingRepliedMessage from './IncomingRepliedMessage/IncomingRepliedMessage';

type MessageProps = {
  message: MessageEntity;
  userId: number;
  setWaitAIWidget: FunctionTypeBooleanToVoid;
  setShowErrorToast: FunctionTypeBooleanToVoid;
  setMessageErrorToast: FunctionTypeStringToVoid;
  messagesToView: MessageEntity[];
  AITranslateWidget: AIMessageWidget;
  AIAssistWidget: AIMessageWidget;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  theme?: UiKitTheme;
  enableForwarding: boolean;
  enableReplying: boolean;
};

// eslint-disable-next-line react/function-component-definition
const Message: React.FC<MessageProps> = ({
  message,
  userId,
  setWaitAIWidget,
  setShowErrorToast,
  setMessageErrorToast,
  messagesToView,
  AITranslateWidget,
  AIAssistWidget,
  onReply,
  onForward,
  theme,
  enableForwarding,
  enableReplying,
}: MessageProps) => {
  const TypeSystemMessage = 'SystemMessage';
  const TypeIncomingMessage = 'IncomingMessage';
  const TypeOutgoingMessage = 'OutgoingMessage';

  let messageView: JSX.Element;

  const defaultGetSenderName: GetUserNameFct = (props: {
    sender?: UserEntity;
  }): Promise<string | undefined> => {
    let result = 'undefined user';
    // eslint-disable-next-line react/prop-types
    const { sender } = props;

    if (!sender) return Promise.resolve(result);
    // eslint-disable-next-line react/prop-types
    result =
      // eslint-disable-next-line react/prop-types
      sender.full_name || sender.login || sender.email || sender.id.toString();

    return Promise.resolve(result);
  };

  const checkMessageType = (m: MessageEntity): string => {
    if (m.notification_type && m.notification_type.length > 0) {
      return TypeSystemMessage;
    }
    if (
      (m.sender && m.sender.id.toString() !== userId?.toString()) ||
      m.sender_id.toString() !== userId?.toString()
    ) {
      return TypeIncomingMessage;
    }

    return TypeOutgoingMessage;
  };

  const messageTypes: string = checkMessageType(message);

  if (messageTypes === TypeSystemMessage) {
    messageView = (
      <div
        className="message-view-container--system-message-wrapper"
        key={message.id}
      >
        {/* <div */}
        {/*  style={theme ? { backgroundColor: theme.disabledElements() } : {}} */}
        {/*  className="message-view-container--system-message-wrapper__date_container" */}
        {/* > */}
        {/*  <SystemDateBanner text={getDateShortFormatEU(message.date_sent)} /> */}
        {/* </div> */}
        <SystemMessageBanner messageText={message.message} />
      </div>
    );
  } else if (messageTypes === TypeIncomingMessage) {
    if (
      message.qb_original_messages &&
      message.qb_original_messages?.length > 0
    ) {
      const typeMessage =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        message.qb_message_action?.includes('forward') ? 'forward' : 'reply';

      if (typeMessage === 'reply') {
        messageView = (
          <IncomingRepliedMessage
            enableReplying={enableReplying}
            enableForwarding={enableForwarding}
            theme={theme}
            messages={message.qb_original_messages}
            date_sent={getTimeShort24hFormat(message.date_sent)}
            repliedUserName={message.origin_sender_name || ''}
            onReply={onReply}
            onForward={onForward}
            onStartLoader={() => {
              setWaitAIWidget(true);
            }}
            onStopLoader={() => {
              setWaitAIWidget(false);
            }}
            onErrorToast={(messageError: string) => {
              setShowErrorToast(true);
              setMessageErrorToast(messageError);
            }}
            currentUserId={userId}
            messagesToView={messagesToView}
            AITranslation={AITranslateWidget}
            AIAnswerToMessage={AIAssistWidget}
            renderOringinalMessage={
              <IncomingMessage
                theme={theme}
                senderNameFct={defaultGetSenderName}
                message={message}
                date_sent={getTimeShort24hFormat(message.date_sent)}
                onReply={onReply}
                onForward={onForward}
                // element={messageContentRender(message)}
                onStartLoader={() => {
                  setWaitAIWidget(true);
                }}
                onStopLoader={() => {
                  setWaitAIWidget(false);
                }}
                onErrorToast={(messageError: string) => {
                  setShowErrorToast(true);
                  setMessageErrorToast(messageError);
                }}
                currentUserId={userId}
                messagesToView={messagesToView}
                AITranslation={AITranslateWidget}
                AIAnswerToMessage={AIAssistWidget}
                enableReplying={enableReplying}
                enableForwarding={enableForwarding}
              />
            }
          />
        );
      } else {
        messageView = (
          <IncomingForwardedMessage
            enableReplying={enableReplying}
            enableForwarding={enableForwarding}
            theme={theme}
            messages={message.qb_original_messages}
            repliedUserName={message.origin_sender_name || ''}
            onReply={onReply}
            onForward={onForward}
            date_sent={getTimeShort24hFormat(message.date_sent)}
            onStartLoader={() => {
              setWaitAIWidget(true);
            }}
            onStopLoader={() => {
              setWaitAIWidget(false);
            }}
            onErrorToast={(messageError: string) => {
              setShowErrorToast(true);
              setMessageErrorToast(messageError);
            }}
            currentUserId={userId}
            messagesToView={messagesToView}
            AITranslation={AITranslateWidget}
            AIAnswerToMessage={AIAssistWidget}
            renderOringinalMessage={
              <IncomingMessage
                theme={theme}
                senderNameFct={defaultGetSenderName}
                message={message}
                date_sent={getTimeShort24hFormat(message.date_sent)}
                onReply={onReply}
                onForward={onForward}
                // element={messageContentRender(message)}
                onStartLoader={() => {
                  setWaitAIWidget(true);
                }}
                onStopLoader={() => {
                  setWaitAIWidget(false);
                }}
                onErrorToast={(messageError: string) => {
                  setShowErrorToast(true);
                  setMessageErrorToast(messageError);
                }}
                currentUserId={userId}
                messagesToView={messagesToView}
                AITranslation={AITranslateWidget}
                AIAnswerToMessage={AIAssistWidget}
                enableReplying={enableReplying}
                enableForwarding={enableForwarding}
              />
            }
          />
        );
      }
    } else {
      messageView = (
        <IncomingMessage
          theme={theme}
          senderNameFct={defaultGetSenderName}
          message={message}
          date_sent={getTimeShort24hFormat(message.date_sent)}
          onReply={onReply}
          onForward={onForward}
          // element={messageContentRender(message)}
          onStartLoader={() => {
            setWaitAIWidget(true);
          }}
          onStopLoader={() => {
            setWaitAIWidget(false);
          }}
          onErrorToast={(messageError: string) => {
            setShowErrorToast(true);
            setMessageErrorToast(messageError);
          }}
          currentUserId={userId}
          messagesToView={messagesToView}
          AITranslation={AITranslateWidget}
          AIAnswerToMessage={AIAssistWidget}
          enableReplying={enableReplying}
          enableForwarding={enableForwarding}
        />
      );
    }
  } else if (
    message.qb_original_messages &&
    message.qb_original_messages?.length > 0
  ) {
    const typeMessage =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      message.qb_message_action?.includes('forward') ? 'forward' : 'reply';

    if (typeMessage === 'reply') {
      messageView = (
        <OutgoingRepliedMessage
          enableReplying={enableReplying}
          enableForwarding={enableForwarding}
          messages={message.qb_original_messages}
          repliedUserName={message.origin_sender_name || '!!!UserName!!!'}
          onReply={onReply}
          onForward={onForward}
          theme={theme}
          renderOringinalMessage={
            <OutgoingMessage
              enableReplying={enableReplying}
              enableForwarding={enableForwarding}
              key={message.id}
              message={message}
              date_sent={getTimeShort24hFormat(message.date_sent)}
              onReply={onReply}
              onForward={onForward}
              theme={theme}
              element={
                <MessageContentComponent
                  theme={theme}
                  messageEntity={message}
                  originalTextMessage
                  widgetTextContent=""
                />
              }
            />
          }
        />
      );
    } else {
      messageView = (
        <OutgoingForwardedMessage
          enableReplying={enableReplying}
          enableForwarding={enableForwarding}
          messages={message.qb_original_messages}
          repliedUserName={message.origin_sender_name || '!!!UserName!!!'}
          date_sent={getTimeShort24hFormat(message.date_sent)}
          status_message={message.delivered_ids && message.delivered_ids.length}
          onReply={onReply}
          onForward={onForward}
          theme={theme}
          renderOringinalMessage={
            <OutgoingMessage
              enableReplying={enableReplying}
              enableForwarding={enableForwarding}
              key={message.id}
              message={message}
              date_sent={getTimeShort24hFormat(message.date_sent)}
              onReply={onReply}
              onForward={onForward}
              theme={theme}
              element={
                <MessageContentComponent
                  theme={theme}
                  messageEntity={message}
                  originalTextMessage
                  widgetTextContent=""
                />
              }
            />
          }
        />
      );
    }
  } else {
    messageView = (
      <OutgoingMessage
        enableReplying={enableReplying}
        enableForwarding={enableForwarding}
        message={message}
        date_sent={getTimeShort24hFormat(message.date_sent)}
        onReply={onReply}
        onForward={onForward}
        theme={theme}
        // element={messageContentRender(message)}
        element={
          <MessageContentComponent
            theme={theme}
            messageEntity={message}
            originalTextMessage
            widgetTextContent=""
          />
        }
      />
    );
  }

  return messageView;
};

export default Message;
