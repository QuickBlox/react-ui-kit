import React, { useEffect } from 'react';
import './ImageAttachment.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';
import { Creator } from '../../../../../../Data/Creator';

type ImageAttachmentComponentProps = {
  imageFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const ImageAttachment: React.FC<ImageAttachmentComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  imageFile,
}: ImageAttachmentComponentProps) => {
  const [fileUrl, setFileUrl] = React.useState('');

  async function getFileForPreview() {
    if (imageFile.url && imageFile.url.length > 0) {
      let tmpFileUrl: string = imageFile.url;
      const { blobFile } = await Creator.createBlobFromUrl(tmpFileUrl);

      tmpFileUrl = blobFile ? URL.createObjectURL(blobFile) : tmpFileUrl || '';
      setFileUrl(tmpFileUrl);
    }
  }

  useEffect(() => {
    getFileForPreview();

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, []);

  return (
    <div className="message-attachment-image">
      <a href={fileUrl} download="file" target="_blank" rel="noreferrer">
        <img
          className="message-attachment-image-body"
          key={imageFile.id}
          src={fileUrl}
          alt={imageFile.name || 'attached image'}
        />
      </a>
    </div>
    // <div className="message-attachment-image">
    //   <a href={imageFile.url} download="file" target="_blank" rel="noreferrer">
    //     <img
    //       className="message-attachment-image-body"
    //       key={imageFile.id}
    //       src={imageFile.url}
    //       alt={imageFile.name || 'attached image'}
    //     />
    //   </a>
    // </div>
  );
};

export default ImageAttachment;
