import './PreviewImageFile.scss';
import React from 'react';

type PreviewImageFileProps = {
  fileName: string;
  imgUrl: string;
};
// eslint-disable-next-line react/function-component-definition
const PreviewImageFile: React.FC<PreviewImageFileProps> = ({
  fileName,
  imgUrl,
}: PreviewImageFileProps) => {
  return (
    <div className="preview-image-file-container">
      <div className="preview-image-file-container--placeholder">
        <img
          className="preview-image-file-container--placeholder__bg"
          src={imgUrl}
        />
      </div>
      <div className="preview-image-file-container--travel-img">{fileName}</div>
    </div>
  );
};

export default PreviewImageFile;
