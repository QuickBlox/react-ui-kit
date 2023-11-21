import './PreviewDefaultFile.scss';
import React from 'react';
import TextDocument from '../../../components/UI/svgs/Icons/Media/TextDocument';

type PreviewDefaultFileProps = {
  fileName: string;
};
// eslint-disable-next-line react/function-component-definition
const PreviewDefaultFile: React.FC<PreviewDefaultFileProps> = ({
  fileName,
}: PreviewDefaultFileProps) => {
  return (
    <div className="preview-default-file-container">
      <div className="preview-default-file-container--placeholder">
        <div className="preview-default-file-container--placeholder__bg" />
        <div className="preview-default-file-container--placeholder__icon">
          <TextDocument
            width="16"
            height="16"
            applyZoom
            color="var(--caption)"
          />
        </div>
      </div>
      <div className="preview-default-file-container--default-file">
        {fileName}
      </div>
    </div>
  );
};

export default PreviewDefaultFile;
