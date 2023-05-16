export declare const UNEXPECTED_REPOSITORY_EXCEPTION_MESSAGE = "error";
export declare const UNEXPECTED_REPOSITORY_EXCEPTION_CODE = 101;
export declare const USER_ENTITY_REPOSITORY_EXCEPTION_MESSAGE = "Error. UserId raise User Entity exception.";
export declare const USER_ENTITY_REPOSITORY_EXCEPTION_CODE = 102;
export declare const DIALOG_ENTITY_REPOSITORY_EXCEPTION_MESSAGE = "Error. DialogId raise Dialog Entity exception.";
export declare const DIALOG_ENTITY_REPOSITORY_EXCEPTION_CODE = 103;
export declare const MESSAGE_ENTITY_REPOSITORY_EXCEPTION_MESSAGE = "Error. MessageId raise Message Entity exception.";
export declare const MESSAGE_ENTITY_REPOSITORY_EXCEPTION_CODE = 103;
export declare const FILE_ENTITY_REPOSITORY_EXCEPTION_MESSAGE = "Error. Id raise File Entity exception.";
export declare const FILE_ENTITY_REPOSITORY_EXCEPTION_CODE = 104;
export default class RepositoryException extends Error {
    message: string;
    readonly code: number;
    constructor(message: string, code: number);
}
