import RepositoryException from './RepositoryException';

export const UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_MESSAGE = 'unexpected';
export const UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE = 111;

export const ALREADY_LOCAL_DATASOURCE_EXIST_EXCEPTION_MESSAGE = 'already exist';
export const ALREADY_LOCAL_DATASOURCE_EXIST_EXCEPTION_CODE = 112;

export const NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE = 'not found';
export const NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE = 113;

export class LocalDataSourceException extends RepositoryException {
  // eslint-disable-next-line no-useless-constructor
  constructor(message: string, code: number) {
    super(message, code);
  }
}
