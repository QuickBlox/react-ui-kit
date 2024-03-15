import React, { useEffect } from 'react';
import ChatMessageAttachmentEntity from '../../../../../Domain/entity/ChatMessageAttachmentEntity';
import { FileType } from '../../../../../Domain/entity/FileTypes';
import VideoBubble from '../VideoBubble/VideoBubble';
import AudioBubble from '../AudioBubble/AudioBubble';
import ImageBubble from '../ImageBubble/ImageBubble';
import FileBubble from '../FileBubble/FileBubble';
import { Creator } from '../../../../../Data/Creator';

interface AttachmentBubbleProps {
  attachment: ChatMessageAttachmentEntity;
  typeMessage: 'incoming' | 'outgoing';
}

export default function AttachmentBubble({
  attachment,
  typeMessage,
}: AttachmentBubbleProps) {
  const [fileUrl, setFileUrl] = React.useState('');

  async function getFileForPreview() {
    if (attachment.url && attachment.url.length > 0) {
      let { url } = attachment;
      const { blobFile } = await Creator.createBlobFromUrl(url);

      url = blobFile ? URL.createObjectURL(blobFile) : url || '';
      setFileUrl(url);
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

  if (attachment.type.toString().includes(FileType.video)) {
    return <VideoBubble title={attachment.file?.name || ''} href={fileUrl} />;
  }
  if (attachment.type.toString().includes(FileType.audio)) {
    return (
      <AudioBubble
        title={attachment.file?.name || ''}
        href={attachment.url}
        type={typeMessage}
        audioFileType={attachment.file?.type?.toString()}
        fileUid={attachment.file?.uid}
      />
    );
  }
  if (attachment.type.toString().includes(FileType.image)) {
    return <ImageBubble title={attachment.file?.name || ''} href={fileUrl} />;
  }

  return (
    <FileBubble
      type={typeMessage}
      title={attachment.file?.name || ''}
      href={fileUrl}
    />
  );
}
