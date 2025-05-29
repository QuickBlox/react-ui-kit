import React, { useEffect } from 'react';
import './VideoAttachment.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';
import { Creator } from '../../../../../../Data/Creator';

type VideoAttachmentComponentProps = {
  videoFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const VideoAttachment = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  videoFile,
}: VideoAttachmentComponentProps) => {
  const [videoUrl, setVideoUrl] = React.useState('');

  async function getFileForPreview() {
    if (videoFile.url && videoFile.url.length > 0) {
      let fileUrl: string = videoFile.url;
      const { blobFile } = await Creator.createBlobFromUrl(fileUrl);

      fileUrl = blobFile ? URL.createObjectURL(blobFile) : fileUrl || '';
      setVideoUrl(fileUrl);
    }
  }

  useEffect(() => {
    getFileForPreview();

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, []);

  return (
    <div>
      <div className="message-attachment-video">
        <video
          className="message-attachment-video-body"
          controls
          key={videoFile.id}
          playsInline
          src={videoUrl}
        >
          <a href={videoUrl} download>
            Download
          </a>
        </video>
      </div>
      <a href={videoUrl} download>
        Download
      </a>
    </div>
  );
};

export default VideoAttachment;
