export declare const jsonParse: <P>(text: string) => string | P;
export declare const parseErrorObject: (data: Dictionary<string | string[]>) => string;
export declare const parseErrorMessage: (message: string) => string;
export declare function isQBError(error: unknown): error is QBError;
export declare function stringifyError(error: unknown): string;
export declare const isSessionDoesNotExistError: (error: string) => boolean;
