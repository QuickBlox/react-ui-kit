import React from 'react';
import ChatMessageAttachmentEntity from '../../../../../Domain/entity/ChatMessageAttachmentEntity';
import DefaultAttachment from './DefaultAttachment/DefaultAttachment';
import { FileType } from '../../../../../Domain/entity/FileTypes';
import VideoAttachment from './VideoAttachment/VideoAttachment';
import ImagePlay from '../../../../components/UI/svgs/Icons/Toggle/ImagePlay';
import AudioAttachment from './AudioAttachment/AudioAttachment';
import AudioFile from '../../../../components/UI/svgs/Icons/Media/AudioFile';
import ImageAttachment from './ImageAttachment/ImageAttachment';
import ImageEmpty from '../../../../components/UI/svgs/Icons/Media/ImageEmpty';
import ImageFile from '../../../../components/UI/svgs/Icons/Media/ImageFile';
import UiKitTheme from '../../../../themes/UiKitTheme';

type AttachmentProps = {
  attachment: ChatMessageAttachmentEntity;
};

type AttachmentContentComponentProps = AttachmentProps & {
  theme?: UiKitTheme;
};

function renderAttachment({ attachment }: AttachmentProps) {
  if (attachment.type.toString().includes(FileType.video)) {
    return attachment.file ? (
      <VideoAttachment videoFile={attachment.file} />
    ) : (
      <ImagePlay />
    );
  }
  if (attachment.type.toString().includes(FileType.audio)) {
    return attachment.file ? (
      <AudioAttachment audioFile={attachment.file} />
    ) : (
      <AudioFile />
    );
  }
  if (attachment.type.toString().includes(FileType.image)) {
    return attachment.file ? (
      <ImageAttachment imageFile={attachment.file} />
    ) : (
      <ImageEmpty />
    );
  }
  if (attachment.type.toString().includes(FileType.text)) {
    return attachment.file ? (
      // <div>TEXT</div>
      <DefaultAttachment
        fileName={attachment.file?.name || ''}
        fileUrl={attachment.file?.url || ''}
      />
    ) : (
      <ImageFile width="24" height="24" applyZoom />
    );
  }

  return (
    <DefaultAttachment
      fileName={attachment.file?.name || ''}
      fileUrl={attachment.file?.url || ''}
    />
  );
}
function MessageAttachment({
  attachment,
  theme,
}: AttachmentContentComponentProps) {
  const contentPlaceHolder = renderAttachment({ attachment });

  let contentResult: JSX.Element = (
    <div className="message-view-container--message-content-wrapper">
      {contentPlaceHolder}
    </div>
  );

  if (attachment.type === FileType.text) {
    contentResult = (
      <div className="message-view-container--file-message-content-wrapper">
        <div
          style={theme ? { backgroundColor: theme.caption() } : {}}
          className="message-view-container__file-message-icon"
        >
          {contentPlaceHolder}
        </div>
        <div>{attachment.name || 'file'}</div>
      </div>
    );
  }

  return contentResult;
}

export default MessageAttachment;
