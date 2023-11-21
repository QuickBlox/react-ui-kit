import React from 'react';
import './DefaultAttachmentComponent.scss';
import TextDocument from '../../../components/UI/svgs/Icons/Media/TextDocument';

type DefaultAttachmentComponentProps = {
  fileName: string;
  fileUrl: string;
};
// eslint-disable-next-line react/function-component-definition
const DefaultAttachmentComponent: React.FC<DefaultAttachmentComponentProps> = ({
  fileName,
  fileUrl,
}: DefaultAttachmentComponentProps) => {
  return (
    <div>
      <div className="default-attachment-component-container">
        <div className="default-attachment-component-container--file-wrapper">
          <div className="default-attachment-component-container--file-wrapper--placeholder">
            <div className="default-attachment-component-container--file-wrapper--placeholder__bg" />
            <div className="default-attachment-component-container--file-wrapper--placeholder__icon">
              <a href={fileUrl} target="_blank" download rel="noreferrer">
                <TextDocument
                  width="16"
                  height="16"
                  applyZoom
                  color="var(--incoming-background)"
                />
              </a>
            </div>
          </div>
          <div className="default-attachment-component-container--file-wrapper__file-d">
            {fileName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultAttachmentComponent;
