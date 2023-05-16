export const UNEXPECTED_REPOSITORY_EXCEPTION_MESSAGE = 'error';
export const UNEXPECTED_REPOSITORY_EXCEPTION_CODE = 101;

export const USER_ENTITY_REPOSITORY_EXCEPTION_MESSAGE =
  'Error. UserId raise User Entity exception.';
export const USER_ENTITY_REPOSITORY_EXCEPTION_CODE = 102;

export const DIALOG_ENTITY_REPOSITORY_EXCEPTION_MESSAGE =
  'Error. DialogId raise Dialog Entity exception.';
export const DIALOG_ENTITY_REPOSITORY_EXCEPTION_CODE = 103;

export const MESSAGE_ENTITY_REPOSITORY_EXCEPTION_MESSAGE =
  'Error. MessageId raise Message Entity exception.';
export const MESSAGE_ENTITY_REPOSITORY_EXCEPTION_CODE = 103;

export const FILE_ENTITY_REPOSITORY_EXCEPTION_MESSAGE =
  'Error. Id raise File Entity exception.';
export const FILE_ENTITY_REPOSITORY_EXCEPTION_CODE = 104;

export default class RepositoryException extends Error {
  public readonly code: number;

  constructor(public message: string, code: number) {
    super(message);
    this.code = code;
  }
}
