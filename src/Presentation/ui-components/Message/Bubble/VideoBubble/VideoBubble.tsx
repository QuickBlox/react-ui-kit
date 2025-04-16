import React from 'react';
import './VideoBubble.scss';

interface VideoBubbleProps {
  title: string;
  href?: string;
  className?: string;
}

export default function VideoBubble({
  title,
  href,
  className,
}: VideoBubbleProps) {
  return (
    <div className={className}>
      <div className="message-attachment-video">
        <video
          className="message-attachment-video-body"
          controls
          key={title}
          playsInline
          src={href}
        >
          <a href={href} download>
            Download
          </a>
        </video>
      </div>
      <a href={href} download className="message-attachment-video-body__link">
        Download
      </a>
    </div>
  );
}
