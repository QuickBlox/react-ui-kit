import React from 'react';
import './AudioAttachmentComponent.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';

type AudioAttachmentComponentProps = {
  audioFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const AudioAttachmentComponent: React.FC<AudioAttachmentComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  audioFile,
}: AudioAttachmentComponentProps) => {
  return (
    <div>
      <audio className="audio-body" controls preload="auto">
        <source src={audioFile.url} type={audioFile?.type?.toString()} />
        <source src={audioFile.url} type="audio/mpeg" />
        <source src={audioFile.url} type="audio/ogg" />
      </audio>
      <a href={audioFile.url} target="_blank" download rel="noreferrer">
        Download
      </a>
    </div>
  );
};

export default AudioAttachmentComponent;
