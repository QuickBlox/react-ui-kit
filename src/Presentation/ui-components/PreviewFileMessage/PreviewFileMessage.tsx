import cn from 'classnames';
import { TextDocumentSvg, AudioFileSvg, PlaySvg } from '../../icons';
import './PreviewFileMessage.scss';

const iconDictionary = {
  document: TextDocumentSvg,
  audio: AudioFileSvg,
  video: PlaySvg,
};

export interface PreviewFileMessageProps {
  type?: 'document' | 'audio' | 'video';
  name: string;
  src?: string;
  className?: string;
}

export default function PreviewFileMessage({
  type = 'document',
  name,
  src,
  className,
}: PreviewFileMessageProps) {
  const Icon = iconDictionary[type];

  return (
    <div className={cn('preview-file-message', className)}>
      {src ? (
        <img src={src} alt="" className="preview-file-message__image" />
      ) : (
        <span className="preview-file-message__image">
          <Icon className="preview-file-message__icon" />
        </span>
      )}
      <span className="preview-file-message__name">{name}</span>
    </div>
  );
}
