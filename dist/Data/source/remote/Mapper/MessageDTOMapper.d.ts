import { IDTOMapper } from './IDTOMapper';
import ChatMessageAttachmentEntity from '../../../../Domain/entity/ChatMessageAttachmentEntity';
export declare class MessageDTOMapper implements IDTOMapper {
    fromDTO<TArg, TResult>(dto: TArg): Promise<TResult>;
    static transformAttachment(qbAtts: ChatMessageAttachment[]): ChatMessageAttachmentEntity[];
    toTDO<TArg, TResult>(entity: TArg): Promise<TResult>;
    private static validateDTO;
    private static validateQBMessage;
}
