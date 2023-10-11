import { Pagination } from '../../../Domain/repository/Pagination';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { FileEntity } from '../../../Domain/entity/FileEntity';
import { IChatMessage } from '../../../Data/source/AISource';
import { Tone } from '../../components/UI/Dialogs/MessagesView/AIWidgets/Tone';

export default class BaseViewModel<TResult> {
  get entity(): TResult {
    return this._entity as TResult;
  }

  set entity(value: TResult) {
    this._entity = value;
  }

  // private _id?: number | undefined;
  //
  // private _name?: string | undefined;
  //
  // get id(): number | undefined {
  //   return this._id;
  // }
  //
  // set id(value: number | undefined) {
  //   this._id = value;
  // }
  //
  // get name(): string | undefined {
  //   return this._name;
  // }
  //
  // set name(value: string | undefined) {
  //   this._name = value;
  // }

  protected constructor(baseEntity: TResult) {
    // id: number, name: string,
    // this._id = id;
    // this._name = name;
    this._entity = baseEntity;
  }

  private _entity?: TResult;
}
export type FunctionTypeViewModelToVoid<TResult> = (
  it: BaseViewModel<TResult>,
) => void;

export type EditDialogParams = {
  dialogTitle: string;
  dialogAvatar: File | string | null;
};

export type FunctionTypeFileToToVoid = (file: File) => void;
export type FunctionTypePaginationToVoid = (pagination: Pagination) => void;
export type FunctionTypeVoidToVoid = () => void;
export type FunctionTypeStringToVoid = (value: string) => void;
export type FunctionTypeBooleanToVoid = (value: boolean) => void;
export type FunctionTypeEditDialogParamsToVoid = (
  params: EditDialogParams,
) => void;
export type FunctionTypeDialogEntityToDialogEntity = (
  entity: GroupDialogEntity,
) => Promise<DialogEntity>;
export type FunctionTypeDialogEntityToBoolean = (
  entity: GroupDialogEntity,
) => Promise<boolean>;
export type FunctionTypeFileToFileEntity = (file: File) => Promise<FileEntity>;
export type FunctionTypeJSXElement = () => JSX.Element;
// export type FunctionTypeChatMessagesToVoid = (
//   lastMessage: string,
//   messages: IChatMessage,
// ) => void;
export type FunctionTypeFileWithContextToToVoid = (
  file: File,
  context: IChatMessage[],
  additionalSettings?: { [key: string]: any },
) => void;
export type FunctionTypeStringWithContextToVoid = (
  value: string,
  context: IChatMessage[],
  additionalSettings?: { [key: string]: any },
) => void;
export type FunctionTypeStringWithContextToString = (
  value: string,
  context: IChatMessage[],
  additionalSettings?: { [key: string]: any },
) => Promise<string>;
export type FunctionTypeVoidToTones = () => Tone[];
