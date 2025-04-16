import { IUseCase } from './base/IUseCase';
import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { PaginatedResult, Pagination } from '../repository/Pagination';

export class GetAllDialogsUseCaseWithMock
  implements IUseCase<void, PaginatedResult<DialogEntity>>
{
  private readonly dialogRepository: DialogsRepository;

  private readonly pagination: Pagination;

  constructor(dialogRepository: DialogsRepository, pagination?: Pagination) {
    this.dialogRepository = dialogRepository;
    this.pagination = pagination || new Pagination();
  }

  async execute(): Promise<PaginatedResult<DialogEntity>> {
    const fromRemote: PaginatedResult<DialogEntity> =
      await this.dialogRepository.getDialogsFromRemote(this.pagination);

    this.dialogRepository.release();
    await Promise.all(
      fromRemote.ResultData.map(async (entity) => {
        // eslint-disable-next-line no-return-await
        return await this.dialogRepository.saveDialogToLocal(entity);
      }),
    );

    const dialogs: Array<DialogEntity> =
      await this.dialogRepository.getDialogsFromLocal(this.pagination);

    return {
      ResultData: dialogs,
      CurrentPagination: fromRemote.CurrentPagination,
    };
  }
}
