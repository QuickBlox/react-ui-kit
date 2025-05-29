import React from 'react';
import './ReplyImagePreviewAttachment.scss';
import { FileEntity } from '../../../../../Domain/entity/FileEntity';

type ReplyImagePreviewAttachmentProps = {
  imageFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const ReplyImagePreviewAttachment: React.FC<
  ReplyImagePreviewAttachmentProps
  // eslint-disable-next-line react/function-component-definition
> = ({ imageFile }: ReplyImagePreviewAttachmentProps) => {
  return (
    <div>
      <a href={imageFile.url} download="file" target="_blank" rel="noreferrer">
        <img
          className="reply-preview-image-body"
          key={imageFile.id}
          src={imageFile.url}
          alt={imageFile.name || 'attached image'}
        />
      </a>
    </div>
  );
};

export default ReplyImagePreviewAttachment;
