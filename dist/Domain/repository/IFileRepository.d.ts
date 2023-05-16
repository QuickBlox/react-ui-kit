import { FileEntity } from '../entity/FileEntity';
export interface IFileRepository {
    saveFileInRemote(fileEntity: FileEntity): Promise<FileEntity>;
    downloadFile(fileEntity: FileEntity): Promise<FileEntity>;
    deleteFile(fileEntity: FileEntity): Promise<boolean>;
}
