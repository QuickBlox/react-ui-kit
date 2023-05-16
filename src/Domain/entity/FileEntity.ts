import { FileType } from './FileTypes';

export interface FileEntity {
  id?: string | number;
  uid: string;
  url?: string;
  name?: string;
  size?: number;
  type?: FileType;
  data?: string | File;
}
