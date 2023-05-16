import { ILocalFileDataSource } from './ILocalFileDataSource';
import { FileEntity } from '../../../Domain/entity/FileEntity';


export class LocalFileDataSource implements ILocalFileDataSource {
  clearAll(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  createFile(file: FileEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteFile(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getFile(id: string): Promise<FileEntity> {
    throw new Error('Method not implemented.')
  }

}
