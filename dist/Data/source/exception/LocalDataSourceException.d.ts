import RepositoryException from './RepositoryException';
export declare const UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_MESSAGE = "unexpected";
export declare const UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE = 111;
export declare const ALREADY_LOCAL_DATASOURCE_EXIST_EXCEPTION_MESSAGE = "already exist";
export declare const ALREADY_LOCAL_DATASOURCE_EXIST_EXCEPTION_CODE = 112;
export declare const NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE = "not found";
export declare const NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE = 113;
export declare class LocalDataSourceException extends RepositoryException {
    constructor(message: string, code: number);
}
