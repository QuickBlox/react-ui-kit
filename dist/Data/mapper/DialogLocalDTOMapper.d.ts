import { IMapper } from './IMapper';
import { DialogEntity } from '../../Domain/entity/DialogEntity';
export declare class DialogLocalDTOMapper implements IMapper {
    fromEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
    toEntity<TArg, TResult>(data: TArg): Promise<TResult>;
    private defineType;
    private static getPhoto;
    private static getDialogName;
    private static getParticipantId;
    private static getParticipantsIds;
    private static validateEntity;
    private static validateIsPrivateDialogCorrect;
    private static validateIsPublicDialogCorrect;
    private static validateIsGroupDialogCorrect;
    private static validateLocalDTO;
    static createDefaultDialogEntity(owner_id: string): DialogEntity;
}
