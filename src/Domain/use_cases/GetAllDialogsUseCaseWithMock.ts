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
    console.log('CONSTRUCTOR GetAllDialogsUseCaseWithMock');
    this.dialogRepository = dialogRepository;
    this.pagination = pagination || new Pagination();
  }

  async execute(): Promise<PaginatedResult<DialogEntity>> {
    console.log('execute GetAllDialogsUseCaseWithMock');
    const fromRemote: PaginatedResult<DialogEntity> =
      await this.dialogRepository.getDialogsFromRemote(this.pagination);

    this.dialogRepository.release();
    await Promise.all(
      fromRemote.ResultData.map(async (entity) => {
        // eslint-disable-next-line no-return-await
        return await this.dialogRepository.saveDialogToLocal(entity);
      }),
    );
    // fromRemote.forEach((entity) => {
    //   this.dialogRepository.saveDialogToLocal(entity);
    //   console.log('store item to local: ', JSON.stringify(entity));
    // });

    const dialogs: Array<DialogEntity> =
      await this.dialogRepository.getDialogsFromLocal(this.pagination);

    return {
      // PaginatedList: fromRemote.PaginatedList,
      ResultData: dialogs,
      CurrentPagination: fromRemote.CurrentPagination,
    };
    //  return this.dialogRepository.getDialogsFromLocal(this.pagination);
  }
}
