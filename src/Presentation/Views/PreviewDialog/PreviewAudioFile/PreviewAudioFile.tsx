import './PreviewAudioFile.scss';
import React from 'react';
import AudioFile from '../../../components/UI/svgs/Icons/Media/AudioFile';

type PreviewAudioFileProps = {
  fileName: string;
};
// eslint-disable-next-line react/function-component-definition
const PreviewAudioFile: React.FC<PreviewAudioFileProps> = ({
  fileName,
}: PreviewAudioFileProps) => {
  return (
    <div className="preview-audio-file-container">
      <div className="preview-audio-file-container--placeholder">
        <div className="preview-audio-file-container--placeholder__bg" />
        <div className="preview-audio-file-container--placeholder__icon">
          <AudioFile width="16" height="16" applyZoom color="var(--caption)" />
        </div>
      </div>
      <div className="preview-audio-file-container--audio-mp-3">{fileName}</div>
    </div>
  );
};

export default PreviewAudioFile;
