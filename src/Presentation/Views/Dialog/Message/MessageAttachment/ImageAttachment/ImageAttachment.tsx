import React, { useEffect } from 'react';
import './ImageAttachment.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';
import { Creator } from '../../../../../../Data/Creator';

type ImageAttachmentComponentProps = {
  imageFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const ImageAttachment = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  imageFile,
}: ImageAttachmentComponentProps) => {
  const [imageUrl, setImageUrl] = React.useState('');

  async function getFileForPreview() {
    if (imageFile.url && imageFile.url.length > 0) {
      let fileUrl: string = imageFile.url;
      const { blobFile } = await Creator.createBlobFromUrl(fileUrl);

      fileUrl = blobFile ? URL.createObjectURL(blobFile) : fileUrl || '';
      setImageUrl(fileUrl);
    }
  }

  useEffect(() => {
    getFileForPreview();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  return (
    <div className="message-attachment-image">
      <a href={imageUrl} download="file" target="_blank" rel="noreferrer">
        <img
          className="message-attachment-image-body"
          key={imageFile.id}
          src={imageUrl}
          alt={imageFile.name || 'attached image'}
        />
      </a>
    </div>
  );
};

export default ImageAttachment;
