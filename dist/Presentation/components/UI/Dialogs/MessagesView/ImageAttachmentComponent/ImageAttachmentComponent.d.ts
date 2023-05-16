import React from 'react';
import './ImageAttachmentComponent.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';
type ImageAttachmentComponentProps = {
    imageFile: FileEntity;
};
declare const ImageAttachmentComponent: React.FC<ImageAttachmentComponentProps>;
export default ImageAttachmentComponent;
