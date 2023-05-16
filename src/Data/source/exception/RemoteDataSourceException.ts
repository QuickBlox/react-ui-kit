import RepositoryException from './RepositoryException';

export const UNAUTHORISED_REMOTE_DATASOURCE_EXCEPTION_MESSAGE = 'unauthorised';
export const UNAUTHORISED_REMOTE_DATASOURCE_EXCEPTION_CODE = 121;

export const INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE =
  'incorrect data';
export const INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE = 122;

export const RESTRICTED_REMOTE_DATASOURCE_ACCESS_EXCEPTION_MESSAGE =
  'restricted access';
export const RESTRICTED_REMOTE_DATASOURCE_ACCESS_EXCEPTION_CODE = 123;

export const CONNECTION_FAILD_REMOTE_DATASOURCE_EXCEPTION_MESSAGE =
  'connection failed';
export const CONNECTION_FAILD_REMOTE_DATASOURCE_EXCEPTION_CODE = 124;

export const NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_MESSAGE = 'not found';
export const NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_CODE = 125;

export class RemoteDataSourceException extends RepositoryException {
  public description: string;

  constructor(message: string, code: number, description = '') {
    super(message, code);
    this.description = description;
  }
}
