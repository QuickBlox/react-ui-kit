import BaseViewModel, {
  FunctionTypeFileToToBoolean,
  FunctionTypeForwardMessagesParamsToBoolean,
  FunctionTypePaginationToVoid,
  FunctionTypeReplyMessagesParamsToBoolean,
  FunctionTypeStringToVoid,
  FunctionTypeVoidToVoid,
} from '../../../CommonTypes/BaseViewModel';
import { MessageEntity } from '../../../Domain/entity/MessageEntity';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { Pagination } from '../../../Domain/repository/Pagination';

export interface DialogViewModel extends BaseViewModel<DialogEntity> {
  loading: boolean;
  error: string;
  pagination: Pagination;
  messages: MessageEntity[]; // content
  getMessages: FunctionTypePaginationToVoid; // prepareContent
  sendTextMessage: FunctionTypeStringToVoid;
  sendAttachmentMessage: FunctionTypeFileToToBoolean;
  sendForwardedMessages: FunctionTypeForwardMessagesParamsToBoolean;
  sendReplyMessages: FunctionTypeReplyMessagesParamsToBoolean;
  release: FunctionTypeVoidToVoid; // release Content
  sendTypingTextMessage: FunctionTypeVoidToVoid; //
  typingText: string;
}
