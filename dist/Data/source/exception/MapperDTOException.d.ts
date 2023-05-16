import RepositoryException from './RepositoryException';
export declare const UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE = "Error. Mapper DTO Unexpected exception .";
export declare const UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE = 131;
export declare const INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE = "Error. Mapper DTO Incorrect data exception .";
export declare const INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE = 132;
export declare class MapperDTOException extends RepositoryException {
    _description: string;
    constructor(message: string, code: number, description?: string);
}
