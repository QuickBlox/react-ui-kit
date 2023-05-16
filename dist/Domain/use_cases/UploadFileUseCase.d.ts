import { IUseCase } from './base/IUseCase';
import { FileRepository } from '../../Data/repository/FileRepository';
import { FileEntity } from '../entity/FileEntity';
export declare class UploadFileUseCase implements IUseCase<void, FileEntity> {
    private fileRepository;
    private fileEntity;
    constructor(fileRepository: FileRepository, fileEntity: FileEntity);
    execute(): Promise<FileEntity>;
}
