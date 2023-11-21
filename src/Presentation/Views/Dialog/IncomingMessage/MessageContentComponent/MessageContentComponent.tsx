import React from 'react';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import UiKitTheme from '../../../../themes/UiKitTheme';
import ColumnContainer from '../../../../components/containers/ColumnContainer/ColumnContainer';
import AttachmentContentComponent from '../AttachmentContentComponent/AttachmentContentComponent';
import {
  HighLightLink,
  messageHasUrls,
} from '../../HighLightLink/HighLightLink';

function MessageContentComponent(props: {
  mc: MessageEntity;
  originalTextMessage: boolean;
  widgetTextContent: string;
  theme: UiKitTheme | undefined;
}) {
  const messageText = (
    <div>
      {!props.originalTextMessage ? (
        <div>{props.widgetTextContent}</div>
      ) : (
        <div>{props.mc.message}</div>
      )}
    </div>
  );
  let messageContent: JSX.Element = messageText;

  if (props.mc.attachments && props.mc.attachments.length > 0) {
    messageContent = (
      <ColumnContainer maxWidth="100%">
        {props.mc.attachments.map((attachment) => (
          <AttachmentContentComponent
            theme={props.theme}
            attachment={attachment}
          />
        ))}
      </ColumnContainer>
    );
  }

  if (
    messageHasUrls(props.mc.message) &&
    !(props.mc.attachments && props.mc.attachments.length > 0)
  ) {
    return <HighLightLink messageText={props.mc.message} />;
  }

  return messageContent;
}

export default MessageContentComponent;
