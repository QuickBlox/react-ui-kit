import React from 'react';

type AttachmentMessageProps = {
  icon: React.ReactNode;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
// eslint-disable-next-line react/function-component-definition
const AttachmentUploader: React.FC<AttachmentMessageProps> = ({
  icon,
  onChangeFile,
}: AttachmentMessageProps) => {
  return (
    <label
      htmlFor="btnUploadAttachment"
      style={{
        cursor: 'pointer',
      }}
    >
      <div>{icon}</div>
      <input
        id="btnUploadAttachment"
        type="file"
        accept="image/*, audio/*, video/*, .pdf, .txt, .apk, .zip, .ipa, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .json, .log"
        style={{ display: 'none' }}
        onChange={(event) => {
          onChangeFile(event);
        }}
      />
    </label>
  );
};

export default AttachmentUploader;
