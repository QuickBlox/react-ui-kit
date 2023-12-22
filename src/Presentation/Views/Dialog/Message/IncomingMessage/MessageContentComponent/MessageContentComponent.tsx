import React, { FC, useEffect } from 'react';
import './MessageContentComponent.scss';
import { MessageEntity } from '../../../../../../Domain/entity/MessageEntity';
import UiKitTheme from '../../../../../themes/UiKitTheme';
import ColumnContainer from '../../../../../components/containers/ColumnContainer/ColumnContainer';
import MessageAttachment from '../../MessageAttachment/MessageAttachment';
import {
  HighLightLink,
  messageHasUrls,
} from '../../HighLightLink/HighLightLink';
import { MessageDTOMapper } from '../../../../../../Data/source/remote/Mapper/MessageDTOMapper';

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
  const [messageTextValue, setMessageTextValue] = React.useState<string>(
    messageEntity.message || '',
  );

  useEffect(() => {
    const value = MessageDTOMapper.formatMessage(messageEntity.message);

    setMessageTextValue(value);
  }, [messageEntity.message]);

  const messageText = (
    <div className="message-content-text">
      {!originalTextMessage ? (
        <div>{widgetTextContent}</div>
      ) : (
        <div>{messageTextValue}</div>
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
    return <HighLightLink messageText={messageTextValue} />;
  }

  return messageContent;
};

export default MessageContentComponent;
