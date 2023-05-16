import { IFileRepository } from '../../Domain/repository/IFileRepository';
import { FileEntity } from '../../Domain/entity/FileEntity';
import { LocalDataSource } from '../source/local/LocalDataSource';
import { RemoteDataSource } from '../source/remote/RemoteDataSource';
export declare class FileRepository implements IFileRepository {
    private localDataSource;
    private remoteDataSource;
    private fileRemoteDTOMapper;
    private fileLocalDTOMapper;
    constructor(localDataStorage: LocalDataSource, remoteDataSource: RemoteDataSource);
    deleteFile(entity: FileEntity): Promise<boolean>;
    downloadFile(entity: FileEntity): Promise<FileEntity>;
    saveFileInRemote(entity: FileEntity): Promise<FileEntity>;
}
