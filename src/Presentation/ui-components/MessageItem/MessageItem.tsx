import React, { RefObject, useState } from 'react';
import { MessageEntity } from '../../../Domain/entity/MessageEntity';
import { getTimeShort24hFormat } from '../../../utils/DateTimeFormatter';
import Message from '../Message/Message';
import TextBubble from '../Message/Bubble/TextBubble/TextBubble';
import AttachmentBubble from '../Message/Bubble/AttachmentBubble/AttachmentBubble';
import AIAssist from '../Message/AIAssist/AIAssist';
import MessageContextMenu from '../Message/MessageContextMenu/MessageContextMenu';
import { FunctionTypeMessageEntityToVoid } from '../../../CommonTypes/BaseViewModel';
import './MessageItem.scss';
import AITranslate from '../Message/AITranslate/AITranslate';
import { AIMessageWidget } from '../../Views/Dialog/AIWidgets/AIMessageWidget';
import { AIUtils } from '../../../utils/utils';
import Loader from '../Loader/Loader';
import MessageSeparator from '../MessageSeparator/MessageSeparator';
import { MessageDTOMapper } from '../../../Data/source/remote/Mapper/MessageDTOMapper';

export type MessageItemProps = {
  message: MessageEntity;
  userId?: number;
  AITranslateWidget: AIMessageWidget;
  AIAssistWidget: AIMessageWidget;
  maxTokens: number;
  defaultTranslationLanguage?: string;
  enableForwarding: boolean;
  enableReplying: boolean;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  // defaultGetSenderName: GetUserNameFct;
  languagesForAITranslate: string[];
  listRef?: RefObject<HTMLDivElement>;
  messagesToView: MessageEntity[];
  loading: boolean;
  onStartLoader: () => void;
  onStopLoader: () => void;
  onErrorToast: (messageError: string) => void;
};

export default function MessageItem({
  message,
  userId,
  enableForwarding,
  enableReplying,
  onReply,
  onForward,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listRef,
  messagesToView,
  loading,
  AITranslateWidget,
  AIAssistWidget,
  maxTokens,
  defaultTranslationLanguage,
  languagesForAITranslate,
  onStartLoader,
  onStopLoader,
  onErrorToast,
}: // defaultGetSenderName,
// languagesForAITranslate,
MessageItemProps) {
  const [waitAITranslateWidget, setWaitAITranslateWidget] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState<boolean>(loading);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [widgetTextContent, setWidgetTextContent] = useState<string>('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [originalTextMessage, setOriginalTextMessage] = useState<boolean>(true);
  const senderName =
    message.sender?.full_name ||
    message.sender?.login ||
    message.sender?.email ||
    // currentUserName ||
    '';

  const TypeSystemMessage = 'system';
  const TypeIncomingMessage = 'incoming';
  const TypeOutgoingMessage = 'outgoing';

  const subTypeMessage = message.qb_message_action?.includes('forward')
    ? 'forward'
    : 'reply';

  async function sendMessageToTranslate(
    messageToTranslatr: MessageEntity,
    messagesToViewTranslate: MessageEntity[],
    currentUserId?: number,
    AITranslation?: AIMessageWidget,
    selectedLanguage?: string,
  ) {
    if (!waitAITranslateWidget) {
      setWaitAITranslateWidget(true);
      await AITranslation?.textToWidget(
        messageToTranslatr.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
        AIUtils.messageEntitiesToIChatMessageCollection(
          messagesToViewTranslate,
          currentUserId,
          maxTokens,
        ),
        {
          language: selectedLanguage,
        },
      )
        .then((textTranslate) => {
          // eslint-disable-next-line promise/always-return
          setWidgetTextContent(textTranslate || '');
          // eslint-disable-next-line promise/always-return
          if (textTranslate === 'Translation failed.') {
            onErrorToast('Translation failed.');
          }
          setWaitAITranslateWidget(false);
          setOriginalTextMessage(false);
        })
        .catch(() => {
          onErrorToast('Translation failed.');
          setWaitAITranslateWidget(false);
          setOriginalTextMessage(true);
        });
    }
  }

  function sendMessageToAIAssistAnswer(
    messageToAssist: MessageEntity,
    messagesToViewAssist: MessageEntity[],
    currentUserId?: number,
    AIAnswerToMessage?: AIMessageWidget,
  ) {
    if (!loading) {
      // setWaitAIWidget(true);
      onStartLoader();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      AIAnswerToMessage?.textToWidget(
        messageToAssist.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
        AIUtils.messageEntitiesToIChatMessageCollection(
          messagesToViewAssist,
          currentUserId,
          maxTokens,
        ),
      )
        // eslint-disable-next-line promise/always-return
        .then(() => {
          // setWaitAITranslateWidget(false);
          onStopLoader();
        })
        .catch(() => {
          onErrorToast('Assist failed.');
          // setWaitAITranslateWidget(false);
          onStopLoader();
        });
    }
  }

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

  function renderAITranslate(item: MessageEntity) {
    return (
      <AITranslate
        waitAIWidget={loading}
        onTranslate={() => {
          sendMessageToTranslate(
            item,
            messagesToView,
            userId,
            AITranslateWidget,
            defaultTranslationLanguage,
          );
        }}
        defaultLanguageForAITranslate={defaultTranslationLanguage!}
        languagesForAITranslate={languagesForAITranslate}
        onClickOriginalText={() => {
          setOriginalTextMessage(true);
          setWidgetTextContent('');
        }}
        originalTextMessage={originalTextMessage}
      />
    );
  }

  function renderAIAssist(item: MessageEntity) {
    return (
      <AIAssist
        onAssistAnswer={() => {
          sendMessageToAIAssistAnswer(
            item,
            messagesToView,
            userId,
            AIAssistWidget,
          );
        }}
        waitAIWidget={loading}
      />
    );
  }

  function renderAdditionalPart(
    currentMessageType: 'incoming' | 'outgoing',
    item: MessageEntity,
  ) {
    return loading && currentMessageType === 'incoming' ? (
      <Loader size="sm" className="message-item-additional-part__loader" />
    ) : (
      <div className="message-item-additional-part__actions">
        <MessageContextMenu
          message={message}
          onReply={onReply}
          onForward={onForward}
          enableReplying={enableReplying}
          enableForwarding={enableForwarding}
        />
        {currentMessageType === 'incoming' &&
          !(item.attachments && item.attachments.length > 0) &&
          renderAIAssist(item)}
      </div>
    );
  }

  function renderForwardedReplyMessageSegment(
    currentMessageType: 'incoming' | 'outgoing',
  ) {
    return message.qb_original_messages &&
      message.qb_original_messages?.length > 0 ? (
      <div>
        {message.qb_original_messages.map((item) => {
          return (
            <Message
              userName={senderName}
              time={getTimeShort24hFormat(message.date_sent)}
              type={currentMessageType}
              subtype={subTypeMessage}
              enableSelect={false}
              isSelect={false}
              disabled={false}
              bottomPart={
                !(item.attachments && item.attachments.length > 0)
                  ? renderAITranslate(item)
                  : undefined
              }
              additionalPart={
                <div className="message-item-additional-part">
                  {renderAdditionalPart(currentMessageType, item)}
                </div>
              }
            >
              {item.attachments && item.attachments.length > 0 ? (
                <div>
                  {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                  {item.attachments.map((attachment) => {
                    return (
                      <AttachmentBubble
                        attachment={attachment}
                        typeMessage={currentMessageType}
                      />
                    );
                  })}
                </div>
              ) : (
                <TextBubble
                  text={originalTextMessage ? item.message : widgetTextContent}
                  type={currentMessageType}
                />
              )}
            </Message>
          );
        })}
      </div>
    ) : null;
  }

  const messageTypes: string = checkMessageType(message);

  if (messageTypes === TypeSystemMessage) {
    return <MessageSeparator text={message.message} type="system" />;
  }

  return messageTypes === TypeIncomingMessage ||
    messageTypes === TypeOutgoingMessage ? (
    <div>
      {renderForwardedReplyMessageSegment(messageTypes)}
      {!message.message.includes(MessageDTOMapper.FORWARD_MESSAGE_PREFIX) && (
        <Message
          userName={senderName}
          time={getTimeShort24hFormat(message.date_sent)}
          type={messageTypes}
          enableSelect={false}
          isSelect={false}
          disabled={false}
          bottomPart={
            !(message.attachments && message.attachments.length > 0)
              ? renderAITranslate(message)
              : undefined
          }
          additionalPart={
            <div className="message-item-additional-part">
              {renderAdditionalPart(messageTypes, message)}
            </div>
          }
        >
          {message.attachments && message.attachments.length > 0 ? (
            <div>
              {message.attachments.map((attachment) => {
                return (
                  <AttachmentBubble
                    attachment={attachment}
                    typeMessage={messageTypes}
                  />
                );
              })}
            </div>
          ) : (
            <TextBubble
              text={originalTextMessage ? message.message : widgetTextContent}
              type={messageTypes}
            />
          )}
        </Message>
      )}
    </div>
  ) : null;
}
