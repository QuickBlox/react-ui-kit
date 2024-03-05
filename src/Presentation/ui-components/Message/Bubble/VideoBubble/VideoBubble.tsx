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
      <div>
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
        <a href={href} download>
          Download
        </a>
      </div>
    </div>
  );
}
