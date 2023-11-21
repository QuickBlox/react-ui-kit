import React from 'react';
import './VideoAttachmentComponent.scss';
import { FileEntity } from '../../../../Domain/entity/FileEntity';

type VideoAttachmentComponentProps = {
  videoFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const VideoAttachmentComponent: React.FC<VideoAttachmentComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  videoFile,
}: VideoAttachmentComponentProps) => {
  return (
    <div>
      <video
        className="video-body"
        controls
        key={videoFile.id}
        playsInline
        src={videoFile.url}
      >
        <a href={videoFile.url} download>
          Download
        </a>
      </video>
      <a href={videoFile.url} download>
        Download
      </a>
    </div>
  );
};

export default VideoAttachmentComponent;
