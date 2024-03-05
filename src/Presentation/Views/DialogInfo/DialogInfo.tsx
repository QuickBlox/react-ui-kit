import React, { useEffect } from 'react';
import './DialogInfo.scss';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import GroupChat from '../../components/UI/svgs/Icons/Contents/GroupChat';
import UsersList from './UsersList/UsersList';
import {
  EditDialogParams,
  FunctionTypeBooleanToVoid,
  FunctionTypeDialogEntityToVoid,
  FunctionTypeVoidToVoid,
} from '../../../CommonTypes/BaseViewModel';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import PublicChannel from '../../components/UI/svgs/Icons/Contents/PublicChannel';
import User from '../../components/UI/svgs/Icons/Contents/User';
import ActiveButton from '../../components/UI/Buttons/ActiveButton/ActiveButton';
import { ModalContext } from '../../providers/ModalContextProvider/Modal';
import EditDialog, { TypeOpenDialog } from '../EditDialog/EditDialog';
import InviteMembers from '../InviteMembers/InviteMembers';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';
import { DialogListViewModel } from '../DialogList/DialogListViewModel';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { FileEntity } from '../../../Domain/entity/FileEntity';
import UserAvatar from '../EditDialog/UserAvatar/UserAvatar';
import MainButton, {
  TypeButton,
} from '../../components/UI/Buttons/MainButton/MainButton';
import useQbInitializedDataContext from '../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import UiKitTheme from '../../themes/UiKitTheme';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import { useMobileLayout } from '../../components/containers/SectionList/hooks';
import useUsersListViewModel from './UsersList/useUsersListViewModel';
import { PrivateDialogEntity } from '../../../Domain/entity/PrivateDialogEntity';
import Header from '../../ui-components/Header/Header';
import { CloseSvg, GroupChatSvg, LeaveSvg } from '../../icons';
import { Badge, SettingsItem } from '../../ui-components';

type HeaderDialogsProps = {
  dialog: DialogEntity;
  dialogViewModel: DialogListViewModel;
  onCloseDialogInformationHandler: FunctionTypeVoidToVoid;
  onLeaveDialog: FunctionTypeDialogEntityToVoid;
  onShowAllMemberClick: FunctionTypeBooleanToVoid;
  users: UserEntity[];
  theme?: UiKitTheme;
  subHeaderContent?: React.ReactNode;
  upHeaderContent?: React.ReactNode;
  rootStyles?: React.CSSProperties;
};
// eslint-disable-next-line react/function-component-definition
const DialogInfo: React.FC<HeaderDialogsProps> = ({
  dialog,
  dialogViewModel,
  onCloseDialogInformationHandler,
  onLeaveDialog,
  onShowAllMemberClick,
  users,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
  subHeaderContent = undefined,
  upHeaderContent = undefined,
  rootStyles = {},
}: HeaderDialogsProps) => {
  const currentContext = useQbInitializedDataContext();
  const currentUserId =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId.toString();
  const { handleModal } = React.useContext(ModalContext);
  const [isMobile] = useMobileLayout();

  const closeModal = () => {
    handleModal(false, '', '', false, false);
  };
  const leaveDialogHandler = () => {
    // handleModal(
    //   true,
    //   <LeaveDialogFlow
    //     dialog={(dialogViewModel?.entity || dialog) as GroupDialogEntity}
    //     dialogsViewModel={dialogViewModel}
    //   />,
    //   'Leave dialog?',
    //   false,
    //   true,
    // );
    onLeaveDialog((dialogViewModel?.entity || dialog) as GroupDialogEntity);
  };
  const userViewModel = useUsersListViewModel(dialog);
  const [dialogAvatarUrl, setDialogAvatarUrl] = React.useState('');
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

  useEffect(() => {
    getDialogPhotoFileForPreview();

    return () => {
      if (dialogAvatarUrl) {
        URL.revokeObjectURL(dialogAvatarUrl);
      }
    };
  }, []);
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
          // closeModal();
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
      closeModal();
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [themeName, setThemeName] = React.useState(
    document.documentElement.getAttribute('data-theme'),
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeThemeActions = () => {
    setThemeName(document.documentElement.getAttribute('data-theme'));
  };

  const getUrlAvatar = (dialogEntity: DialogEntity) => {
    switch (dialogEntity.type) {
      case DialogType.group:
        return (dialogEntity as GroupDialogEntity).photo || undefined;
        break;
      case DialogType.public:
        return (dialogEntity as PublicDialogEntity).photo || undefined;
        break;
      case DialogType.private:
        return undefined;
        break;
      default:
        return undefined;
        break;
    }
  };

  const useSubContent = subHeaderContent || false;
  const useUpContent = upHeaderContent || false;

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
          closeModal();
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
          closeModal();
        })
        .catch((e) => {
          console.log('Exception: ', e);
        });
    }
  };

  const handleToggleModal = () =>
    handleModal(
      true,
      <InviteMembers
        participants={PublicDialogEntity.getParticipants(
          dialogViewModel?.entity || dialog,
        )}
        applyInviteUsersHandler={applyInviteUsersHandler}
        cancelInviteMembersHandler={() => {
          closeModal();
        }}
        typeAddEditDialog={TypeOpenDialog.edit}
        typeDialog={dialog.type}
        idOwnerDialog={dialog.ownerId}
      />,
      'Edit dialog',
      false,
      false,
    );

  return (
    <div style={{ ...rootStyles }} className="dialog-information-container">
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
              <div className="dialog-information-profile-edit-button">
                <ActiveButton
                  content="Edit"
                  clickAction={() => {
                    handleModal(
                      true,
                      <EditDialog
                        nameDialog={dialogViewModel?.entity.name || dialog.name}
                        typeDialog={dialogViewModel?.entity.type || dialog.type}
                        ulrIcon={getUrlAvatar(
                          dialogViewModel?.entity || dialog,
                        )}
                        typeAddEditDialog={TypeOpenDialog.edit}
                        clickUpdatedHandler={getDialogUpdatedInfoHandler}
                        clickCancelHandler={closeModal}
                      />,
                      'Edit dialog',
                      false,
                      false,
                      isMobile
                        ? {
                            width: '300px',
                            backgroundColor: 'var(--main-background)',
                          }
                        : {
                            width: '380px',
                            // minWidth: '332px',
                            // maxWidth: '332px',
                            backgroundColor: 'var(--main-background)',
                          },
                    );
                  }}
                  touchAction={() => {
                    console.log('call onTouch');
                  }}
                />
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
                <MainButton
                  title="Invite members"
                  clickHandler={handleToggleModal}
                  typeButton={TypeButton.outlined}
                  disabled={dialog.ownerId !== currentUserId}
                />
                <MainButton
                  title="See all members"
                  typeButton={TypeButton.outlined}
                  clickHandler={() => onShowAllMemberClick(true)}
                />
              </div>
            </ColumnContainer>
          </SettingsItem>
        ) : null}
        <SettingsItem
          icon={<LeaveSvg />}
          title="Leave dialog"
          onClick={leaveDialogHandler}
          className="dialog-info-leave"
        />
      </ColumnContainer>
    </div>
  );
};

export default DialogInfo;
