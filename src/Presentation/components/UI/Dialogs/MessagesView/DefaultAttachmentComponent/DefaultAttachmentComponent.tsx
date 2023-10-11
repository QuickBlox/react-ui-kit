import React from 'react';
import './DefaultAttachmentComponent.scss';
import TextDocument from '../../../svgs/Icons/Media/TextDocument';

type DefaultAttachmentComponentProps = {
  fileName: string;
};
// eslint-disable-next-line react/function-component-definition
const DefaultAttachmentComponent: React.FC<DefaultAttachmentComponentProps> = ({
  fileName,
}: DefaultAttachmentComponentProps) => {
  return (
    <div className="default-attachment-component-container">
      <div className="default-attachment-component-container--file-wrapper">
        <div className="default-attachment-component-container--file-wrapper--placeholder">
          <div className="default-attachment-component-container--file-wrapper--placeholder__bg" />
          <div className="default-attachment-component-container--file-wrapper--placeholder__icon">
            <TextDocument
              width="16"
              height="16"
              applyZoom
              color="var(--incoming-background)"
            />
          </div>
        </div>
        <div className="default-attachment-component-container--file-wrapper__file-d">
          {fileName}
        </div>
      </div>
    </div>
  );
};

export default DefaultAttachmentComponent;
