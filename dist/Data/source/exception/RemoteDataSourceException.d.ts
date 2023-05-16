import RepositoryException from './RepositoryException';
export declare const UNAUTHORISED_REMOTE_DATASOURCE_EXCEPTION_MESSAGE = "unauthorised";
export declare const UNAUTHORISED_REMOTE_DATASOURCE_EXCEPTION_CODE = 121;
export declare const INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE = "incorrect data";
export declare const INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE = 122;
export declare const RESTRICTED_REMOTE_DATASOURCE_ACCESS_EXCEPTION_MESSAGE = "restricted access";
export declare const RESTRICTED_REMOTE_DATASOURCE_ACCESS_EXCEPTION_CODE = 123;
export declare const CONNECTION_FAILD_REMOTE_DATASOURCE_EXCEPTION_MESSAGE = "connection failed";
export declare const CONNECTION_FAILD_REMOTE_DATASOURCE_EXCEPTION_CODE = 124;
export declare const NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_MESSAGE = "not found";
export declare const NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_CODE = 125;
export declare class RemoteDataSourceException extends RepositoryException {
    description: string;
    constructor(message: string, code: number, description?: string);
}
