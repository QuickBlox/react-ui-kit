import { Pagination } from '../../../Domain/repository/Pagination';
import { LocalMessageDTO } from './LocalMessageDTO';

export class LocalMessagesDTO {
  get messages(): Array<LocalMessageDTO> {
    return this._messages;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  private _messages: Array<LocalMessageDTO>;

  private _pagination: Pagination;

  constructor(messages: Array<LocalMessageDTO>, pagination: Pagination) {
    this._pagination = pagination;
    this._messages = messages;
  }
}
