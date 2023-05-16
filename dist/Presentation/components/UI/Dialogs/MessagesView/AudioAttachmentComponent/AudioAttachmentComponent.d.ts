import React from 'react';
import './AudioAttachmentComponent.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';
type AudioAttachmentComponentProps = {
    audioFile: FileEntity;
};
declare const AudioAttachmentComponent: React.FC<AudioAttachmentComponentProps>;
export default AudioAttachmentComponent;
