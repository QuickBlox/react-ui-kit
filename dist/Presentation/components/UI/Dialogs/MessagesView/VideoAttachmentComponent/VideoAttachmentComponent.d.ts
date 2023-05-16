import React from 'react';
import './VideoAttachmentComponent.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';
type VideoAttachmentComponentProps = {
    videoFile: FileEntity;
};
declare const VideoAttachmentComponent: React.FC<VideoAttachmentComponentProps>;
export default VideoAttachmentComponent;
