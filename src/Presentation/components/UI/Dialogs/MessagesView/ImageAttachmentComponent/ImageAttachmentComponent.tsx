import React from 'react';
import './ImageAttachmentComponent.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';

type ImageAttachmentComponentProps = {
  imageFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const ImageAttachmentComponent: React.FC<ImageAttachmentComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  imageFile,
}: ImageAttachmentComponentProps) => {
  return (
    <div>
      <img
        className="image-body"
        key={imageFile.id}
        src={imageFile.url}
        alt={imageFile.name || 'attached image'}
      />
    </div>
  );
};

export default ImageAttachmentComponent;
