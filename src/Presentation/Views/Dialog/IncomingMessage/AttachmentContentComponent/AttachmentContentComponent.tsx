import React from 'react';
import ChatMessageAttachmentEntity from '../../../../../Domain/entity/ChatMessageAttachmentEntity';
import DefaultAttachmentComponent from '../../DefaultAttachmentComponent/DefaultAttachmentComponent';
import { FileType } from '../../../../../Domain/entity/FileTypes';
import VideoAttachmentComponent from '../../VideoAttachmentComponent/VideoAttachmentComponent';
import ImagePlay from '../../../../components/UI/svgs/Icons/Toggle/ImagePlay';
import AudioAttachmentComponent from '../../AudioAttachmentComponent/AudioAttachmentComponent';
import AudioFile from '../../../../components/UI/svgs/Icons/Media/AudioFile';
import ImageAttachmentComponent from '../../ImageAttachmentComponent/ImageAttachmentComponent';
import ImageEmpty from '../../../../components/UI/svgs/Icons/Media/ImageEmpty';
import ImageFile from '../../../../components/UI/svgs/Icons/Media/ImageFile';
import UiKitTheme from '../../../../themes/UiKitTheme';

function AttachmentContentComponent(props: {
  attachment: ChatMessageAttachmentEntity;
  theme: UiKitTheme | undefined;
}) {
  let contentPlaceHolder: JSX.Element = (
    <DefaultAttachmentComponent
      fileName={props.attachment.file?.name || ''}
      fileUrl={props.attachment.file?.url || ''}
    />
  );

  if (props.attachment.type.toString().includes(FileType.video)) {
    contentPlaceHolder = props.attachment.file ? (
      <VideoAttachmentComponent videoFile={props.attachment.file} />
    ) : (
      <ImagePlay />
    );
  }
  if (props.attachment.type.toString().includes(FileType.audio)) {
    contentPlaceHolder = props.attachment.file ? (
      <AudioAttachmentComponent audioFile={props.attachment.file} />
    ) : (
      <AudioFile />
    );
  }
  if (props.attachment.type.toString().includes(FileType.image)) {
    contentPlaceHolder = props.attachment.file ? (
      <ImageAttachmentComponent imageFile={props.attachment.file} />
    ) : (
      <ImageEmpty />
    );
  }
  if (props.attachment.type.toString().includes(FileType.text)) {
    contentPlaceHolder = props.attachment.file ? (
      // <div>TEXT</div>
      <DefaultAttachmentComponent
        fileName={props.attachment.file?.name || ''}
        fileUrl={props.attachment.file?.url || ''}
      />
    ) : (
      <ImageFile width="24" height="24" applyZoom />
    );
  }
  let contentResult: JSX.Element = (
    <div className="message-view-container--message-content-wrapper">
      {contentPlaceHolder}
    </div>
  );

  if (props.attachment.type === FileType.text) {
    contentResult = (
      <div className="message-view-container--file-message-content-wrapper">
        <div
          style={props.theme ? { backgroundColor: props.theme.caption() } : {}}
          className="message-view-container__file-message-icon"
        >
          {contentPlaceHolder}
        </div>
        <div>{props.attachment.name || 'file'}</div>
      </div>
    );
  }

  return contentResult;
}

export default AttachmentContentComponent;
