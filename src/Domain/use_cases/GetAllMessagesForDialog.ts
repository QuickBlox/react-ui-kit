import { IUseCase } from './base/IUseCase';
import { MessageEntity } from '../entity/MessageEntity';
import { IMessagesRepository } from '../repository/IMessagesRepository';
import { PaginatedResult, Pagination } from '../repository/Pagination';

export class GetAllMessagesForDialogMock
  implements IUseCase<void, PaginatedResult<MessageEntity>>
{
  private messagesRepository: IMessagesRepository;

  private readonly dialogId: string;

  private currentPagination: Pagination;

  constructor(
    messagesRepository: IMessagesRepository,
    dialogId: string,
    currentPagination: Pagination,
  ) {
    console.log('CONSTRUCTOR GetAllMessagesForDialog');
    this.messagesRepository = messagesRepository;
    this.dialogId = dialogId;
    this.currentPagination = currentPagination;
  }

  // eslint-disable-next-line class-methods-use-this
  async execute(): Promise<PaginatedResult<MessageEntity>> {
    console.log('execute GetAllMessagesForDialog');
    //
    const result: PaginatedResult<MessageEntity> =
      await this.messagesRepository.getMessagesFromRemote(
        this.dialogId,
        this.currentPagination,
      );

    console.log(
      `GET MESSAGES ${
        result.ResultData.length
      } FROM REPOSITORY: ${JSON.stringify(result)} `,
    );

    //
    // await Promise.all(
    //   result.ResultData.map(async (entity) => {
    //     await this.messagesRepository.saveMessageToLocal(entity).catch((e) => {
    //       console.log(
    //         'EXCEPTION MessageEntity perform in GetAllMessagesForDialog: ',
    //         JSON.stringify(entity),
    //       );
    //       console.log(stringifyError(e));
    //     });
    //
    //     return entity;
    //   }),
    // );
    // return this.messagesRepository.getMessagesFromLocal(this.dialogId);
    //
    //
    return result;
  }
}
