import { Pagination } from '../../../Domain/repository/Pagination';
import { RemoteMessageDTO } from './RemoteMessageDTO';

export class RemoteMessagesDTO {
  get messages(): Array<RemoteMessageDTO> {
    return this._messages;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  private _messages: Array<RemoteMessageDTO>;

  private _pagination: Pagination;

  constructor(messages: Array<RemoteMessageDTO>, pagination: Pagination) {
    this._pagination = pagination;
    this._messages = messages;
  }
}
