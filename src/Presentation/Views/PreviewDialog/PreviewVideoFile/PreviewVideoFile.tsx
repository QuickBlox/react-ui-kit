import './PreviewVideoFile.scss';
import React from 'react';
import ImagePlay from '../../../components/UI/svgs/Icons/Toggle/ImagePlay';

type PreviewVideoFileProps = {
  fileName: string;
};
// eslint-disable-next-line react/function-component-definition
const PreviewVideoFile: React.FC<PreviewVideoFileProps> = ({
  fileName,
}: PreviewVideoFileProps) => {
  return (
    <div className="preview-video-file-container">
      <div className="preview-video-file-container--placeholder">
        <div className="preview-video-file-container--placeholder__bg" />
        <div className="preview-video-file-container--placeholder__icon">
          <ImagePlay width="16" height="16" applyZoom color="var(--caption)" />
        </div>
      </div>
      <div className="preview-video-file-container--video-mp-4">{fileName}</div>
    </div>
  );
};

export default PreviewVideoFile;
