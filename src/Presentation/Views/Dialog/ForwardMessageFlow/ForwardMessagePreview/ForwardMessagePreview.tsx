import React from 'react';
import './ForwardMessagePreview.scss';
import ForwardFilled from '../../../../components/UI/svgs/Icons/Actions/ForwardFilled';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { FileType } from '../../../../../Domain/entity/FileTypes';
import ReplyImagePreviewAttachment from '../../ReplyMessagePreview/ReplyImagePreviewAttachment/ReplyImagePreviewAttachment';
import TextDocument from '../../../../components/UI/svgs/Icons/Media/TextDocument';

type ForwardMessagePreviewProps = {
  messages: MessageEntity[];
  userNameSentMessage: string; //! !!currentUser: UserEntity
  // userId: string;
};

function trimMessage(messageText: string) {
  return `${messageText.substring(0, 29)} ...`;
}

// eslint-disable-next-line react/function-component-definition
const ForwardMessagePreview: React.FC<ForwardMessagePreviewProps> = ({
  messages,
  userNameSentMessage,
}: ForwardMessagePreviewProps) => {
  return (
    <div className="forward-message-preview">
      {/* <img className="photo" src="photo.png" /> */}
      {messages.length > 0 &&
      messages[0].attachments &&
      messages[0].attachments.length > 0 ? (
        <div className="forward-message-preview-placeholder">
          <div className="forward-message-preview-placeholder-icon">
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

      <div className="forward-message-preview-message">
        <div className="forward-message-preview-message-caption">
          <div className="forward-message-preview-caption-info">
            <div className="forward-message-preview-caption-info-icon">
              <ForwardFilled width="16" height="16" color="var(--caption)" />
            </div>
            <div className="forwarded-message-from-name">
              Forwarded from {userNameSentMessage}
            </div>
          </div>
        </div>
        <div className="forwarded-message-text">
          {messages.length > 0 &&
          (!messages[0].attachments ||
            (messages[0].attachments &&
              messages[0].attachments.length === 0)) ? (
            <div className="forward-message-preview-message-caption-info-text">
              {messages.length > 1
                ? '2 messages'
                : trimMessage(messages[0].message)}
            </div>
          ) : (
            <div className="forward-message-preview-message-caption-info-file">
              {messages.length > 1
                ? '2 messages'
                : trimMessage(messages[0].message)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForwardMessagePreview;
