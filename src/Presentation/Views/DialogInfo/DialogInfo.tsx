import React, { useEffect, useState } from 'react';
import './DialogInfo.scss';
import { toast } from 'react-toastify';
import cn from 'classnames';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import GroupChat from '../../components/UI/svgs/Icons/Contents/GroupChat';
import UsersList from './UsersList/UsersList';
import {
  EditDialogParams,
  FunctionTypeBooleanToVoid,
  FunctionTypeVoidToVoid,
} from '../../../CommonTypes/BaseViewModel';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import PublicChannel from '../../components/UI/svgs/Icons/Contents/PublicChannel';
import User from '../../components/UI/svgs/Icons/Contents/User';
import EditDialog, { TypeOpenDialog } from '../EditDialog/EditDialog';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';
import { DialogListViewModel } from '../DialogList/DialogListViewModel';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { FileEntity } from '../../../Domain/entity/FileEntity';
import UserAvatar from '../EditDialog/UserAvatar/UserAvatar';
import useQbInitializedDataContext from '../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import UiKitTheme from '../../themes/UiKitTheme';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import useUsersListViewModel from './UsersList/useUsersListViewModel';
import { PrivateDialogEntity } from '../../../Domain/entity/PrivateDialogEntity';
import { CloseSvg, GroupChatSvg, LeaveSvg } from '../../icons';
import { Badge, Button, DialogWindow, SettingsItem } from '../../ui-components';
import useModal from '../../../hooks/useModal';
import Header from '../../ui-components/Header/Header';
import InviteMembers from '../InviteMembers/InviteMembers';

type HeaderDialogsProps = {
  dialog: DialogEntity;
  dialogViewModel: DialogListViewModel;
  onCloseDialogInformationHandler: FunctionTypeVoidToVoid;
  onShowAllMemberClick: FunctionTypeBooleanToVoid;
  users: UserEntity[];
  theme?: UiKitTheme;
  subHeaderContent?: React.ReactNode;
  upHeaderContent?: React.ReactNode;
  rootStyles?: React.CSSProperties;
  disableAction?: boolean;
};
// eslint-disable-next-line react/function-component-definition
const DialogInfo = ({
  dialog,
  dialogViewModel,
  onCloseDialogInformationHandler,
  onShowAllMemberClick,
  users,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
  subHeaderContent = undefined,
  upHeaderContent = undefined,
  rootStyles = {},
  disableAction = false,
}: HeaderDialogsProps) => {
  const [dialogAvatarUrl, setDialogAvatarUrl] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [themeName, setThemeName] = React.useState(
    document.documentElement.getAttribute('data-theme'),
  );

  const userViewModel = useUsersListViewModel(dialog);
  const editModal = useModal();
  const inviteMembersModal = useModal();
  const leaveModal = useModal();

  const currentContext = useQbInitializedDataContext();
  const currentUserId =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId.toString();
  const useSubContent = subHeaderContent || false;
  const useUpContent = upHeaderContent || false;
  const [isLeaving, setIsLeaving] = useState(false);
  const toastLeavingId = React.useRef(null);
  const leaveDialogHandler = () => {
    if (!disableAction) {
      setIsLeaving(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toastLeavingId.current = toast('leaving dialog', {
        autoClose: false,
        isLoading: true,
      });
      // eslint-disable-next-line promise/catch-or-return
      dialogViewModel
        .deleteDialog((dialogViewModel?.entity || dialog) as GroupDialogEntity)
        .then((result) => {
          // eslint-disable-next-line promise/always-return
          if (!result) {
            toast('Dialog have not been left');
          }
          leaveModal.toggleModal();
        })
        .catch((e) => {
          console.log(e);
          toast("Can't leave dialog");
        })
        .finally(() => {
          setIsLeaving(false);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          toast.dismiss(toastLeavingId.current);
        });
    }
  };

  const getUserAvatarByUid = async () => {
    let result = '';
    const participants: Array<number> =
      dialogViewModel?.entity &&
      dialogViewModel?.entity.type === DialogType.private
        ? [
            (dialogViewModel?.entity as unknown as PrivateDialogEntity)
              .participantId,
          ]
        : [];
    const senderUser = await userViewModel.getUserById(participants[0]);

    result = senderUser?.photo || '';

    return result;
  };

  async function getDialogPhotoFileForPreview() {
    const tmpFileUrl: string = await getUserAvatarByUid();

    if (tmpFileUrl && tmpFileUrl.length > 0) {
      setDialogAvatarUrl(tmpFileUrl);
    }
  }

  // eslint-disable-next-line consistent-return
  const renderIconForTypeDialog = (dialogEntity: DialogEntity) => {
    console.log(JSON.stringify(dialogEntity));
    if (dialogEntity.type === DialogType.group) {
      const groupDialogEntity = dialogEntity as GroupDialogEntity;

      if (groupDialogEntity.photo) {
        return (
          <UserAvatar
            urlAvatar={groupDialogEntity.photo}
            iconTheme={{ width: '81px', height: '81px' }}
          />
        );
      }

      return (
        <div className="dialog-info-profile-avatar-default-icon">
          <div className="dialog-info-profile-avatar-ellipse">
            <div className="dialog-info-profile-avatar-contents">
              <GroupChat width="51" height="51" color="var(--secondary-text)" />
            </div>
          </div>
        </div>
      );
    }
    if (dialogEntity.type === DialogType.private) {
      return dialogAvatarUrl ? (
        <UserAvatar
          urlAvatar={dialogAvatarUrl}
          iconTheme={{ width: '81px', height: '81px' }}
        />
      ) : (
        <div className="dialog-info-profile-avatar-default-icon">
          <div className="dialog-info-profile-avatar-ellipse">
            <div className="dialog-info-profile-avatar-contents">
              <User width="51" height="51" color="var(--secondary-text)" />
            </div>
          </div>
        </div>
      );
    }
    if (dialogEntity.type === DialogType.public) {
      const publicDialogEntity = dialogEntity as PublicDialogEntity;

      if (publicDialogEntity.photo) {
        return (
          <UserAvatar
            urlAvatar={publicDialogEntity.photo}
            iconTheme={{ width: '81px', height: '81px' }}
          />
        );
      }

      return (
        <div className="dialog-info-profile-avatar-default-icon">
          <div className="dialog-info-profile-avatar-ellipse">
            <div className="dialog-info-profile-avatar-contents">
              <PublicChannel
                width="51"
                height="51"
                color="var(--secondary-text)"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  async function executeUpdateActions(params: EditDialogParams) {
    let newUidAvatar: string | undefined | null = null;

    console.log('before urlPhoto: ', newUidAvatar);
    if (params.dialogAvatar) {
      if (params.dialogAvatar !== 'null') {
        const uploadedFile: FileEntity = await dialogViewModel.uploadFile(
          params.dialogAvatar as File,
        );

        newUidAvatar = uploadedFile.uid;
      } else {
        newUidAvatar = 'null';
      }
    }
    console.log('after urlPhoto: ', newUidAvatar);

    if (
      // newUidAvatar ||
      (dialog as GroupDialogEntity).photo !== newUidAvatar ||
      (params.dialogTitle.length > 0 && params.dialogTitle !== dialog.name)
    ) {
      const dialogForUpdate: GroupDialogEntity = {
        ...(dialog as GroupDialogEntity),
        name: params.dialogTitle,
        photo: newUidAvatar, // || '',
        newParticipantIds: [],
      };

      dialogViewModel
        .updateDialog(dialogForUpdate)
        // eslint-disable-next-line promise/always-return
        .then((data) => {
          console.log('result update title dialog: ', JSON.stringify(data));
        })
        .catch((e) => {
          console.log('Exception: ', e);
        });
    }
  }

  const getDialogUpdatedInfoHandler = (params: EditDialogParams) => {
    console.log(
      'call getDialogUpdatedInfoHandler, params: ',
      JSON.stringify(params),
    );

    // eslint-disable-next-line promise/catch-or-return,promise/always-return
    executeUpdateActions(params).then(() => {
      editModal.toggleModal();
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeThemeActions = () => {
    setThemeName(document.documentElement.getAttribute('data-theme'));
  };

  const getUrlAvatar = (dialogEntity: DialogEntity) => {
    switch (dialogEntity.type) {
      case DialogType.group:
        return (dialogEntity as GroupDialogEntity).photo || undefined;
      case DialogType.public:
        return (dialogEntity as PublicDialogEntity).photo || undefined;
      case DialogType.private:
        return undefined;
      default:
        return undefined;
    }
  };

  const applyInviteUsersHandler = (
    usersForInvite: number[],
    usersForRemove: number[],
  ) => {
    const alreadyPresents = PublicDialogEntity.getParticipants(
      dialogViewModel?.entity || dialog,
    );
    const newParticipants = usersForInvite.filter(
      (item) => alreadyPresents.indexOf(item) < 0,
    );

    if (newParticipants.length > 0) {
      const dialogForUpdate: GroupDialogEntity = {
        ...(dialogViewModel?.entity || (dialog as GroupDialogEntity)),
        participantIds: (
          (dialogViewModel?.entity || dialog) as GroupDialogEntity
        ).participantIds,
        newParticipantIds: newParticipants,
        photo: '',
        name: '',
      };

      dialogViewModel
        .updateDialog(dialogForUpdate)
        // eslint-disable-next-line promise/always-return,@typescript-eslint/no-unused-vars
        .then((data) => {
          if (editModal.isOpen) {
            editModal.toggleModal();
          }
          if (inviteMembersModal.isOpen) {
            inviteMembersModal.toggleModal();
          }

          return data;
        })
        .catch((e) => {
          console.log('Exception: ', e);
        });
    }

    if (usersForRemove.length > 0) {
      const dialogForUpdate: GroupDialogEntity = {
        ...((dialogViewModel?.entity || dialog) as GroupDialogEntity),
        photo: '',
        name: '',
        participantsToRemoveIds: usersForRemove,
      };

      dialogViewModel
        .removeMembers(dialogForUpdate)
        // eslint-disable-next-line promise/always-return,@typescript-eslint/no-unused-vars
        .then((data) => {
          inviteMembersModal.toggleModal();
        })
        .catch((e) => {
          console.log('Exception: ', e);
        });
    }
  };

  useEffect(() => {
    getDialogPhotoFileForPreview();

    return () => {
      if (dialogAvatarUrl) {
        URL.revokeObjectURL(dialogAvatarUrl);
      }
    };
  }, []);

  return (
    <div style={{ ...rootStyles }} className="dialog-information-container">
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: '100',
          display: isLeaving ? 'block' : 'none',
        }}
      />
      <ColumnContainer>
        {useUpContent && upHeaderContent}
        <Header title="Dialog information" className="header-dialog-info">
          <CloseSvg
            onClick={onCloseDialogInformationHandler}
            className="header-dialog-info-icon"
          />
        </Header>
        {useSubContent && subHeaderContent}

        <div className="dialog-information-profile">
          <div className="dialog-information-profile-avatar">
            {renderIconForTypeDialog(dialogViewModel?.entity || dialog)}
          </div>
          <div className="dialog-information-profile-dialog-name">
            {dialogViewModel?.entity?.name || dialog?.name}
          </div>
          <div className="dialog-information-profile-edit">
            {dialog.type !== DialogType.private &&
            dialog.ownerId === currentUserId ? (
              <div
                className={cn('dialog-information-profile-edit-button', {
                  'dialog-information-profile-edit-button--disable':
                    disableAction,
                })}
              >
                <Button
                  variant="text"
                  onClick={editModal.toggleModal}
                  disabled={disableAction}
                >
                  Edit
                </Button>
                <DialogWindow
                  title="Edit dialog"
                  onClose={editModal.toggleModal}
                  open={editModal.isOpen}
                >
                  <EditDialog
                    disableActions={disableAction}
                    nameDialog={dialogViewModel?.entity?.name || dialog?.name}
                    typeDialog={dialogViewModel?.entity?.type || dialog?.type}
                    ulrIcon={getUrlAvatar(dialogViewModel?.entity || dialog)}
                    typeAddEditDialog={TypeOpenDialog.edit}
                    clickUpdatedHandler={getDialogUpdatedInfoHandler}
                    clickCancelHandler={editModal.toggleModal}
                  />
                </DialogWindow>
              </div>
            ) : null}
          </div>
        </div>
        {dialog.type !== DialogType.private ? (
          <SettingsItem
            icon={<GroupChatSvg />}
            title="Members"
            rightSection={<Badge mute count={users.length} limit={100} />}
            className="dialog-info-members"
          >
            <ColumnContainer>
              {users && users.length > 0 && (
                <div className="dialog-info-action-wrapper-settings no-padding">
                  <UsersList
                    maxHeight={75}
                    usersFirstPageToView={users}
                    allUsers={users}
                    usersInDialogCount={users.length}
                  />
                </div>
              )}
              <div className="dialog-info-action-wrapper-settings">
                <DialogWindow
                  disableActions={disableAction}
                  title="Edit dialog"
                  open={inviteMembersModal.isOpen}
                  onClose={inviteMembersModal.toggleModal}
                >
                  <InviteMembers
                    participants={PublicDialogEntity.getParticipants(
                      dialogViewModel?.entity || dialog,
                    )}
                    applyInviteUsersHandler={applyInviteUsersHandler}
                    cancelInviteMembersHandler={inviteMembersModal.toggleModal}
                    typeAddEditDialog={TypeOpenDialog.edit}
                    typeDialog={dialog.type}
                    idOwnerDialog={dialog.ownerId}
                  />
                </DialogWindow>
                <Button
                  className="dialog-info-action-wrapper-button"
                  onClick={inviteMembersModal.toggleModal}
                  variant="outlined"
                  disabled={dialog.ownerId !== currentUserId || disableAction}
                >
                  Invite members
                </Button>
                <Button
                  className="dialog-info-action-wrapper-button"
                  onClick={() => onShowAllMemberClick(true)}
                  variant="outlined"
                  disabled={disableAction}
                >
                  See all members
                </Button>
              </div>
            </ColumnContainer>
          </SettingsItem>
        ) : null}
        <SettingsItem
          icon={<LeaveSvg />}
          title="Leave dialog"
          onClick={!disableAction ? leaveModal.toggleModal : undefined}
          className={cn('dialog-info-leave', {
            'dialog-info-leave--disable': disableAction,
          })}
        />
        <DialogWindow
          open={leaveModal.isOpen}
          title="Leave dialog?"
          onClose={leaveModal.toggleModal}
        >
          <div className="dialog-leave-container">
            <Button variant="outlined" onClick={leaveModal.toggleModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={leaveDialogHandler}>
              Leave
            </Button>
          </div>
        </DialogWindow>
      </ColumnContainer>
    </div>
  );
};

export default DialogInfo;
