import React from 'react';
import './ImageBubble.scss';

interface ImageBubbleProps {
  title: string;
  href?: string;
}

export default function ImageBubble({ title, href }: ImageBubbleProps) {
  return (
    <a
      href={href}
      download="file"
      target="_blank"
      rel="noreferrer"
      className="message-attachment-image"
    >
      <img
        className="message-attachment-image-body"
        key={href}
        src={href}
        alt={title || 'attached image'}
      />
    </a>
  );
}
