import React from 'react';

type AttachmentMessageProps = {
  icon: React.ReactNode;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disableAction: boolean;
};
// eslint-disable-next-line react/function-component-definition
const AttachmentUploader= ({
  icon,
  onChangeFile,
  disableAction,
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
          // eslint-disable-next-line no-param-reassign
          event.target.value = '';
        }}
        disabled={disableAction}
      />
    </label>
  );
};

export default AttachmentUploader;
