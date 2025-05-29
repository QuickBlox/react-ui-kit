import { FileType } from './FileTypes';

export interface FileEntity {
  id?: string | number;
  uid: string;
  url?: string;
  name?: string;
  size?: number | string;
  type?: FileType;
  data?: File;
}
