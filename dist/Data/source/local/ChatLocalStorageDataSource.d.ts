import { FunctionResult } from '../../../CommonTypes/FunctionResult';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';
export declare function getOne(id: number): Promise<FunctionResult<PublicDialogEntity>>;
export declare function getOneFromCash(id: number): Promise<FunctionResult<PublicDialogEntity>>;
export declare function getOneFromPreload(id: number): Promise<FunctionResult<PublicDialogEntity>>;
export declare function getAll(): Promise<FunctionResult<PublicDialogEntity[]>>;
export declare function getAllFromCash(): Promise<FunctionResult<PublicDialogEntity[]>>;
export declare function getAllFromPreload(): Promise<FunctionResult<PublicDialogEntity[]>>;
