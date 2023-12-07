import React from 'react';
import './VideoAttachment.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';

type VideoAttachmentComponentProps = {
  videoFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const VideoAttachment: React.FC<VideoAttachmentComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  videoFile,
}: VideoAttachmentComponentProps) => {
  return (
    <div>
      <div className="message-attachment-video">
        <video
          className="message-attachment-video-body"
          controls
          key={videoFile.id}
          playsInline
          src={videoFile.url}
        >
          <a href={videoFile.url} download>
            Download
          </a>
        </video>
      </div>
      <a href={videoFile.url} download>
        Download
      </a>
    </div>
  );
};

export default VideoAttachment;
