import React, { useEffect } from 'react';
import './DialogInfo.scss';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import Close from '../../components/UI/svgs/Icons/Navigation/Close';
import GroupChat from '../../components/UI/svgs/Icons/Contents/GroupChat';
import UsersList from './UsersList/UsersList';
import ActiveSvg from '../../components/UI/svgs/ActiveSvg/ActiveSvg';
import {
  EditDialogParams,
  FunctionTypeBooleanToVoid,
  FunctionTypeVoidToVoid,
} from '../../../CommonTypes/BaseViewModel';
import Leave from '../../components/UI/svgs/Icons/Navigation/Leave';
import Next from '../../components/UI/svgs/Icons/Navigation/Next';
import Down from '../../components/UI/svgs/Icons/Navigation/Down';
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
import LeaveDialogFlow from '../Flow/LeaveDialogFlow/LeaveDialogFlow';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import { useMobileLayout } from '../../components/containers/SectionList/hooks';
import useUsersListViewModel from './UsersList/useUsersListViewModel';
import { PrivateDialogEntity } from '../../../Domain/entity/PrivateDialogEntity';

type HeaderDialogsProps = {
  dialog: DialogEntity;
  dialogViewModel: DialogListViewModel;
  onCloseDialogInformationHandler: FunctionTypeVoidToVoid;
  onShowAllMemberClick: FunctionTypeBooleanToVoid;
  showMembersDialogInitValue?: boolean;
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
  onShowAllMemberClick,
  showMembersDialogInitValue = false,
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
  const [showMembersDialog, setShowMembersDialog] = React.useState(
    showMembersDialogInitValue,
  );
  const [isMobile] = useMobileLayout();

  useEffect(() => {
    setShowMembersDialog(showMembersDialogInitValue);
  }, [showMembersDialogInitValue]);

  // const searchDialogHandler = () => {
  //   console.log('searchDialogHandler');
  // };
  const closeModal = () => {
    handleModal(false, '', '', false, false);
  };
  const leaveDialogHandler = () => {
    handleModal(
      true,
      <LeaveDialogFlow
        dialog={(dialogViewModel?.entity || dialog) as GroupDialogEntity}
        dialogsViewModel={dialogViewModel}
      />,
      'Leave dialog?',
      false,
      true,
    );
  };
  const showMembersDialogHandler = () => {
    setShowMembersDialog(!showMembersDialog);
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

  return (
    <div style={{ ...rootStyles }} className="dialog-information-container">
      <ColumnContainer>
        {useUpContent && upHeaderContent}
        <div className="header-dialog-info">
          <div className="header-dialog-info-headline">Dialog information</div>
          <div className="header-dialog-info-icon">
            <ActiveSvg
              content={<Close applyZoom color="var(--secondary-elements)" />}
              onClick={onCloseDialogInformationHandler}
            />
          </div>
        </div>

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
        {/* <div className="dialog-info-action-wrapper-settings"> */}
        {/*  <div className="dialog-info-action-wrapper-settings-icon"> */}
        {/*    <div className="dialog-info-action-wrapper-settings-contents"> */}
        {/*      <NotifyOn width="24" height="24" applyZoom /> */}
        {/*    </div> */}
        {/*  </div> */}
        {/*  <div className="dialog-info-action-wrapper-settings-subtitle"> */}
        {/*    Notifications */}
        {/*  </div> */}
        {/*  <SwitchButton */}
        {/*    clickHandler={() => { */}
        {/*      console.log('clicked SwitchButton Notifications...'); */}
        {/*    }} */}
        {/*  /> */}
        {/* </div> */}
        {dialog.type !== DialogType.private ? (
          <div>
            <div className="dialog-info-action-wrapper-settings">
              <div className="dialog-info-action-wrapper-settings-icon">
                <div className="dialog-info-action-wrapper-settings-contents">
                  <GroupChat
                    width="24"
                    height="24"
                    applyZoom
                    color="var(--color-icon)"
                  />
                </div>
              </div>
              <div className="dialog-info-action-wrapper-settings-subtitle">
                Members
              </div>
              <div className="dialog-info-action-wrapper-settings-right">
                <div className="dialog-info-action-wrapper-settings-right-badge">
                  <div className="dialog-info-action-wrapper-settings-right-badge-title">
                    {users.length}
                  </div>
                </div>
                <div className="dialog-info-action-wrapper-settings-icon">
                  <ActiveSvg
                    content={
                      showMembersDialog ? (
                        <Down
                          applyZoom
                          width="24"
                          height="24"
                          color="var(--secondary-elements)"
                        />
                      ) : (
                        <Next
                          applyZoom
                          width="24"
                          height="24"
                          color="var(--secondary-elements)"
                        />
                      )
                    }
                    onClick={showMembersDialogHandler}
                    // onTouch={showMembersDialogHandler} //todo artik 29.12.2023 don't need for mobile
                  />
                </div>
              </div>
            </div>
            <div>
              {showMembersDialog ? (
                <ColumnContainer>
                  {/* {userViewModel?.loading && ( */}
                  {/*  <div */}
                  {/*    style={{ */}
                  {/*      height: '44px', */}
                  {/*      width: '44px', */}
                  {/*    }} */}
                  {/*  > */}
                  {/*    <LoaderComponent width="44" height="44" /> */}
                  {/*  </div> */}
                  {/* )} */}
                  {/* {userViewModel?.error && ( */}
                  {/*  <ErrorComponent */}
                  {/*    title={userViewModel?.error} */}
                  {/*    ClickActionHandler={() => { */}
                  {/*      console.log('call retry after error...'); */}
                  {/*    }} */}
                  {/*  /> */}
                  {/* )} */}
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
                      clickHandler={() => {
                        handleModal(
                          true,
                          <InviteMembers
                            participants={PublicDialogEntity.getParticipants(
                              dialogViewModel?.entity || dialog,
                            )}
                            applyInviteUsersHandler={(
                              usersForInvite,
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              usersForRemove,
                            ) => {
                              const alreadyPresents =
                                PublicDialogEntity.getParticipants(
                                  dialogViewModel?.entity || dialog,
                                );
                              const newParticipants = usersForInvite.filter(
                                (item) => alreadyPresents.indexOf(item) < 0,
                              );

                              if (newParticipants.length > 0) {
                                const dialogForUpdate: GroupDialogEntity = {
                                  ...(dialogViewModel?.entity ||
                                    (dialog as GroupDialogEntity)),
                                  participantIds: (
                                    (dialogViewModel?.entity ||
                                      dialog) as GroupDialogEntity
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
                                  ...((dialogViewModel?.entity ||
                                    dialog) as GroupDialogEntity),
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
                            }}
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
                      }}
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
              ) : null}
            </div>
          </div>
        ) : null}
        {/* <div className="dialog-info-action-wrapper-settings"> */}
        {/*  <div className="dialog-info-action-wrapper-settings-icon"> */}
        {/*    <ActiveSvg */}
        {/*      content={<Search width="24" height="24" applyZoom />} */}
        {/*      onClick={() => searchDialogHandler()} */}
        {/*      onTouch={() => searchDialogHandler()} */}
        {/*    /> */}
        {/*  </div> */}
        {/*  <div className="dialog-info-action-wrapper-settings-subtitle"> */}
        {/*    Search in dialog */}
        {/*  </div> */}
        {/* </div> */}
        <div className="dialog-info-action-wrapper-settings">
          <div className="dialog-info-action-wrapper-settings-icon">
            <ActiveSvg
              content={
                <Leave width="24" height="24" applyZoom color="var(--error)" />
              }
              onClick={() => {
                leaveDialogHandler();
              }}
              onTouch={() => {
                leaveDialogHandler();
              }}
            />
          </div>
          <div className="dialog-info-action-wrapper-settings-subtitle">
            Leave dialog
          </div>
        </div>
      </ColumnContainer>
    </div>
  );
};

export default DialogInfo;
