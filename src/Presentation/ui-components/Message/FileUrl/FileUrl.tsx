import React from 'react';
import { ReactComponent as FileSvg } from '../../../icons/media/file.svg';
import './FileUrl.scss';

interface FileUrlProps {
  title: string;
  href?: string;
}

const trimFileName = (fileName: string) => {
  if (fileName.length > 10) {
    return `${fileName.substring(0, 9)}... .${fileName.slice(
      (Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1,
    )}`;
  }

  return fileName;
};

export default function FileUrl({ title, href }: FileUrlProps) {
  return (
    <div className="file-attachment">
      <div className="file-attachment__placeholder">
        <div className="file-attachment__placeholder__bg" />
        {href ? (
          <a
            href={href}
            target="_blank"
            download
            rel="noreferrer"
            className="file-attachment__placeholder__bg__icon"
          >
            <FileSvg className="message-icon-file" />
          </a>
        ) : (
          <div className="file-attachment__placeholder__bg__icon">
            <FileSvg className="message-icon-file" />
          </div>
        )}
      </div>
      <div className="file-attachment__file-name">{trimFileName(title)}</div>
    </div>
  );
}
