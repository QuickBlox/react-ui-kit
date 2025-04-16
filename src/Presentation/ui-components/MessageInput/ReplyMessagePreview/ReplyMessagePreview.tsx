import React, { useEffect } from 'react';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import ReplyFilled from '../../../components/UI/svgs/Icons/Actions/ReplyFilled';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';
import { FileType } from '../../../../Domain/entity/FileTypes';
import ReplyImagePreviewAttachment from './ReplyImagePreviewAttachment/ReplyImagePreviewAttachment';
import TextDocument from '../../../components/UI/svgs/Icons/Media/TextDocument';
import { MessageDTOMapper } from '../../../../Data/source/remote/Mapper/MessageDTOMapper';
import './ReplyMessagePreview.scss';
import { CloseSvg } from '../../../icons';

type ReplyMessagePreviewProps = {
  messages: MessageEntity[];
  userNameSentMessage: string;
  // userId: string;
  onClose: FunctionTypeVoidToVoid;
};

function trimMessage(messageText: string) {
  return `${messageText.substring(0, 39)} ...`;
}

// eslint-disable-next-line react/function-component-definition
const ReplyMessagePreview = ({
  messages,
  userNameSentMessage,
  onClose,
}: ReplyMessagePreviewProps) => {
  const [messageTextValue, setMessageTextValue] = React.useState<string>('');

  useEffect(() => {
    const value = MessageDTOMapper.formatMessage(messages[0].message);

    setMessageTextValue(value);
  }, [messages[0]?.message]);

  return (
    <div className="reply-message-preview-row">
      <div className="reply-message-preview-row-card">
        {messages.length > 0 &&
        messages[0].attachments &&
        messages[0].attachments.length > 0 ? (
          <div className="reply-message-preview-placeholder">
            <div className="reply-message-preview-placeholder-icon">
              {messages &&
              messages[0].attachments &&
              messages[0].attachments.length > 0 &&
              messages[0].attachments[0].type
                .toString()
                .includes(FileType.image) &&
              messages[0].attachments[0].file ? (
                <ReplyImagePreviewAttachment
                  imageFile={messages[0].attachments[0].file}
                />
              ) : (
                <TextDocument width="24" height="24" color="var(--caption)" />
              )}
            </div>
          </div>
        ) : null}

        <div className="reply-message-preview-message">
          <div className="reply-message-preview-message-caption">
            <div className="reply-message-preview-message-caption-info">
              <div className="reply-message-preview-message-caption-info-icon">
                <ReplyFilled width="16" height="16" color="var(--caption)" />
              </div>
              <div className="reply-message-preview-message-caption-info-replied-to-name">
                Reply to {userNameSentMessage}
              </div>
            </div>
          </div>
          {messages.length > 0 &&
          (!messages[0].attachments ||
            (messages[0].attachments &&
              messages[0].attachments.length === 0)) ? (
            <div className="reply-message-preview-message-caption-info-text">
              {messages.length > 1
                ? '2 messages'
                : trimMessage(messageTextValue)}
            </div>
          ) : (
            <div className="reply-message-preview-message-caption-info-file">
              {messages.length > 1
                ? '2 messages'
                : trimMessage(messageTextValue)}
            </div>
          )}
        </div>
      </div>
      <div
        className="reply-message-preview-message-navigation-close"
        onClick={onClose}
      >
        <CloseSvg className="reply-message-icon" />
      </div>
    </div>
  );
};

export default ReplyMessagePreview;
