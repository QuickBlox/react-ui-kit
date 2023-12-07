import React, { FC } from 'react';
import { MessageEntity } from '../../../../../../Domain/entity/MessageEntity';
import UiKitTheme from '../../../../../themes/UiKitTheme';
import ColumnContainer from '../../../../../components/containers/ColumnContainer/ColumnContainer';
import MessageAttachment from '../../MessageAttachment/MessageAttachment';
import {
  HighLightLink,
  messageHasUrls,
} from '../../HighLightLink/HighLightLink';

type MessageContentComponentProps = {
  messageEntity: MessageEntity;
  originalTextMessage: boolean;
  widgetTextContent: string;
  theme?: UiKitTheme;
};
// eslint-disable-next-line react/function-component-definition
const MessageContentComponent: FC<MessageContentComponentProps> = ({
  messageEntity,
  originalTextMessage,
  widgetTextContent,
  theme,
}: MessageContentComponentProps) => {
  const messageText = (
    <div style={{ overflowWrap: 'break-word', maxWidth: '320px' }}>
      {!originalTextMessage ? (
        <div>{widgetTextContent}</div>
      ) : (
        <div>{messageEntity.message}</div>
      )}
    </div>
  );
  let messageContent: JSX.Element = messageText;

  if (messageEntity.attachments && messageEntity.attachments.length > 0) {
    messageContent = (
      <ColumnContainer maxWidth="100%">
        {messageEntity.attachments.map((attachment) => (
          <MessageAttachment theme={theme} attachment={attachment} />
        ))}
      </ColumnContainer>
    );
  }

  if (
    messageHasUrls(messageEntity.message) &&
    !(messageEntity.attachments && messageEntity.attachments.length > 0)
  ) {
    return <HighLightLink messageText={messageEntity.message} />;
  }

  return messageContent;
};

export default MessageContentComponent;
