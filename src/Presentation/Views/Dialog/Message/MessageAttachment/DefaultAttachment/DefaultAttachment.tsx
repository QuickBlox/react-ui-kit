import React from 'react';
import './DefaultAttachment.scss';
import TextDocument from '../../../../../components/UI/svgs/Icons/Media/TextDocument';

function trimFileName(fileName: string) {
  if (fileName.length > 10) {
    return `${fileName.substring(0, 9)}... .${fileName.slice(
      (Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1,
    )}`;
  }

  return fileName;
}

type DefaultAttachmentComponentProps = {
  fileName: string;
  fileUrl: string;
};
// eslint-disable-next-line react/function-component-definition
const DefaultAttachment: React.FC<DefaultAttachmentComponentProps> = ({
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
            {trimFileName(fileName)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultAttachment;
