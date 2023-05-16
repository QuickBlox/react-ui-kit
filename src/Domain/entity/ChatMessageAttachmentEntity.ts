import { FileEntity } from './FileEntity';
import { FileType } from './FileTypes';

export default interface ChatMessageAttachmentEntity {
  /** ID of the file on QuickBlox server (UID of file from QB.content.createAndUpload) */
  id: string | number;
  uid?: string;
  file?: FileEntity;
  type: FileType;
  /** Link to a file in Internet */
  url?: string;
  name?: string;
  size?: number;
  [key: string]: unknown;
}
