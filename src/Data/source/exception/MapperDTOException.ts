import RepositoryException from './RepositoryException';

export const UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE =
  'Error. Mapper DTO Unexpected exception .';
export const UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE = 131;

export const INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE =
  'Error. Mapper DTO Incorrect data exception .';
export const INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE = 132;

export class MapperDTOException extends RepositoryException {
  public _description: string;

  // eslint-disable-next-line no-useless-constructor
  constructor(message: string, code: number, description = '') {
    super(message, code);
    this._description = description;
    if (this._description) {
      this.message += ` ${this._description}`;
    }
  }
}
