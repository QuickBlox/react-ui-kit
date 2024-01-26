import React, { useEffect } from 'react';
import './VideoAttachment.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';
import { Creator } from '../../../../../../Data/Creator';

type VideoAttachmentComponentProps = {
  videoFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const VideoAttachment: React.FC<VideoAttachmentComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  videoFile,
}: VideoAttachmentComponentProps) => {
  const [fileUrl, setFileUrl] = React.useState('');

  async function getFileForPreview() {
    if (videoFile.url && videoFile.url.length > 0) {
      let tmpFileUrl: string = videoFile.url;
      const { blobFile } = await Creator.createBlobFromUrl(tmpFileUrl);

      tmpFileUrl = blobFile ? URL.createObjectURL(blobFile) : tmpFileUrl || '';
      setFileUrl(tmpFileUrl);
    }
  }

  useEffect(() => {
    getFileForPreview();

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, []);

  return (
    <div>
      <div className="message-attachment-video">
        <video
          className="message-attachment-video-body"
          controls
          key={videoFile.id}
          playsInline
          src={fileUrl}
        >
          <a href={fileUrl} download>
            Download
          </a>
        </video>
      </div>
      <a href={fileUrl} download>
        Download
      </a>
    </div>
    // <div>
    //   <div className="message-attachment-video">
    //     <video
    //       className="message-attachment-video-body"
    //       controls
    //       key={videoFile.id}
    //       playsInline
    //       src={videoFile.url}
    //     >
    //       <a href={videoFile.url} download>
    //         Download
    //       </a>
    //     </video>
    //   </div>
    //   <a href={videoFile.url} download>
    //     Download
    //   </a>
    // </div>
  );
};

export default VideoAttachment;
