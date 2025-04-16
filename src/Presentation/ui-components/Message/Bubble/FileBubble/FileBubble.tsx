import React from 'react';
import './FileBubble.scss';
import FileUrl from '../../FileUrl/FileUrl';

interface FileBubbleProps {
  type: 'outgoing' | 'incoming';
  title: string;
  href?: string;
}

export default function FileBubble({ type, title, href }: FileBubbleProps) {
  return (
    <div className={`file-bubble-background__${type}`}>
      <FileUrl title={title} href={href} />
    </div>
  );
}
