import { Pagination } from '../Domain/repository/Pagination';
import { GroupDialogEntity } from '../Domain/entity/GroupDialogEntity';
import { DialogEntity } from '../Domain/entity/DialogEntity';
import { FileEntity } from '../Domain/entity/FileEntity';
import { IChatMessage } from '../Data/source/AISource';
import { Tone } from '../Presentation/Views/Dialog/AIWidgets/Tone';
import { MessageEntity } from '../Domain/entity/MessageEntity';
import { UserEntity } from '../Domain/entity/UserEntity';

export default class BaseViewModel<TResult> {
  get entity(): TResult {
    return this._entity as TResult;
  }

  set entity(value: TResult) {
    this._entity = value;
  }

  protected constructor(baseEntity: TResult) {
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

export type ForwardMessagesParams = {
  messagesToForward: MessageEntity[];
  targetDialogs: DialogEntity[];
  relatedTextMessage?: string;
  relatedFileMessage?: File;
};

export type ReplyMessagesParams = {
  messagesToReply: MessageEntity[];
  relatedTextMessage?: string;
  relatedFileMessage?: File;
};

export type FunctionTypeReplyMessagesParamsToBoolean = (
  replyData: ReplyMessagesParams,
) => Promise<boolean>;
export type FunctionTypeForwardMessagesParamsToBoolean = (
  forwardingData: ForwardMessagesParams,
) => Promise<boolean>;
export type FunctionTypeFileToToVoid = (file: File) => void;
export type FunctionTypeMessageEntityToVoid = (message: MessageEntity) => void;
export type FunctionDialogEntityToVoid = (dialog: DialogEntity) => void;
export type FunctionTypeFileToToBoolean = (file: File) => Promise<boolean>;
export type FunctionTypePaginationToVoid = (pagination: Pagination) => void;
export type FunctionTypeVoidToVoid = () => void;
export type FunctionTypeUserIdToUserEntity = (
  id: number,
) => Promise<UserEntity>;
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
export type FunctionTypeDialogEntityToVoid = (entity: DialogEntity) => void;
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
