import { ILocalFileDataSource } from './ILocalFileDataSource';
import { FileEntity } from '../../../Domain/entity/FileEntity';
export declare class LocalFileDataSource implements ILocalFileDataSource {
    clearAll(): Promise<void>;
    createFile(file: FileEntity): Promise<void>;
    deleteFile(id: string): Promise<void>;
    getFile(id: string): Promise<FileEntity>;
}
