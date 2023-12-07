import React from 'react';
import './ImageAttachment.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';

type ImageAttachmentComponentProps = {
  imageFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const ImageAttachment: React.FC<ImageAttachmentComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  imageFile,
}: ImageAttachmentComponentProps) => {
  return (
    <div className="message-attachment-image">
      <a href={imageFile.url} download="file" target="_blank" rel="noreferrer">
        <img
          className="message-attachment-image-body"
          key={imageFile.id}
          src={imageFile.url}
          alt={imageFile.name || 'attached image'}
        />
      </a>
    </div>
  );
};

export default ImageAttachment;
