import { FileEntity } from '../../../Domain/entity/FileEntity';
export interface ILocalFileDataSource {
    clearAll(): Promise<void>;
    getFile(id: string): Promise<FileEntity>;
    createFile(file: FileEntity): Promise<void>;
    deleteFile(id: string): Promise<void>;
}
