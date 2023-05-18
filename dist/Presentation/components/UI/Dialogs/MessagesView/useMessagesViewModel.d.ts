import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
import { MessagesViewModel } from './MessagesViewModel';
export default function useMessagesViewModel(dialogType: DialogType, dialogEntity: DialogEntity): MessagesViewModel;
