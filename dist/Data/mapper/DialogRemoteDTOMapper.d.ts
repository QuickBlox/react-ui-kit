import { IMapper } from './IMapper';
import { DialogEntity } from '../../Domain/entity/DialogEntity';
export declare class DialogRemoteDTOMapper implements IMapper {
    fromEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
    toEntity<TArg, TResult>(data: TArg): Promise<TResult>;
    private static getPhoto;
    private static getDialogName;
    private static getParticipantId;
    private static getParticipantsIds;
    private static getNewParticipantsIds;
    static createDefaultDialogEntity(owner_id: string): DialogEntity;
    private static validateEntity;
    private static validateIsPrivateDialogCorrect;
    private static validateIsPublicDialogCorrect;
    private static validateIsGroupDialogCorrect;
    private defineType;
    private static validateRemoteDTO;
}
