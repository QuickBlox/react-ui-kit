import { IUseCase } from './base/IUseCase';
import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { PaginatedResult, Pagination } from '../repository/Pagination';
export declare class GetAllDialogsUseCaseWithMock implements IUseCase<void, PaginatedResult<DialogEntity>> {
    private readonly dialogRepository;
    private readonly pagination;
    constructor(dialogRepository: DialogsRepository, pagination?: Pagination);
    execute(): Promise<PaginatedResult<DialogEntity>>;
}
