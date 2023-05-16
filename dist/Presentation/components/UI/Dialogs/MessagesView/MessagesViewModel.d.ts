import BaseViewModel, { FunctionTypeFileToToVoid, FunctionTypePaginationToVoid, FunctionTypeStringToVoid, FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
export interface MessagesViewModel extends BaseViewModel<DialogEntity> {
    loading: boolean;
    error: string;
    messages: MessageEntity[];
    getMessages: FunctionTypePaginationToVoid;
    sendTextMessage: FunctionTypeStringToVoid;
    sendAttachmentMessage: FunctionTypeFileToToVoid;
    release: FunctionTypeVoidToVoid;
    sendTypingTextMessage: FunctionTypeVoidToVoid;
    typingText: string;
}
