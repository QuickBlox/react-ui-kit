import BaseViewModel, {
  FunctionTypeFileToToBoolean,
  FunctionTypePaginationToVoid,
  FunctionTypeStringToVoid,
  FunctionTypeVoidToVoid,
} from '../../../../Views/Base/BaseViewModel';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';

export interface MessagesViewModel extends BaseViewModel<DialogEntity> {
  loading: boolean;
  error: string;
  messages: MessageEntity[]; // content
  getMessages: FunctionTypePaginationToVoid; // prepareContent
  sendTextMessage: FunctionTypeStringToVoid;
  sendAttachmentMessage: FunctionTypeFileToToBoolean;
  release: FunctionTypeVoidToVoid; // release Content
  sendTypingTextMessage: FunctionTypeVoidToVoid; //
  typingText: string;
}
