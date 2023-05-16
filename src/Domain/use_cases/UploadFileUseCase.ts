import { IUseCase } from './base/IUseCase';
import { FileRepository } from '../../Data/repository/FileRepository';
import { FileEntity } from '../entity/FileEntity';

export class UploadFileUseCase implements IUseCase<void, FileEntity> {
  private fileRepository: FileRepository;

  private fileEntity: FileEntity;

  constructor(fileRepository: FileRepository, fileEntity: FileEntity) {
    console.log('CONSTRUCTOR UploadFileUseCase');
    this.fileRepository = fileRepository;
    this.fileEntity = fileEntity;
  }

  async execute(): Promise<FileEntity> {
    console.log('execute UploadFileUseCase');
    const result: FileEntity = await this.fileRepository.saveFileInRemote(
      this.fileEntity,
    );

    return Promise.resolve(result);
  }
}
