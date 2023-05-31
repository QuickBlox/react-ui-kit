import React, { useEffect } from 'react';
import './DialogInformation.scss';
import ColumnContainer from '../../../containers/ColumnContainer/ColumnContainer';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
import Close from '../../svgs/Icons/Navigation/Close';
import NotifyOn from '../../svgs/Icons/Toggle/NotifyOn';
import SwitchButton from '../../Elements/SwitchButton/SwitchButton';
import GroupChat from '../../svgs/Icons/Contents/GroupChat';
import Search from '../../svgs/Icons/Navigation/Search';
import UsersList from './UsersList/UsersList';
import useUsersListViewModel from './UsersList/useUsersListViewModel';
import ErrorComponent from '../../Placeholders/ErrorComponent/ErrorComponent';
import LoaderComponent from '../../Placeholders/LoaderComponent/LoaderComponent';
import ActiveSvg from '../../svgs/ActiveSvg/ActiveSvg';
import {
  EditDialogParams,
  FunctionTypeVoidToVoid,
} from '../../../../Views/Base/BaseViewModel';
import Leave from '../../svgs/Icons/Navigation/Leave';
import Next from '../../svgs/Icons/Navigation/Next';
import Down from '../../svgs/Icons/Navigation/Down';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import PublicChannel from '../../svgs/Icons/Contents/PublicChannel';
import User from '../../svgs/Icons/Contents/User';
import ActiveButton from '../../Buttons/ActiveButton/ActiveButton';
import { ModalContext } from '../../../providers/ModalContextProvider/Modal';
import EditDialog, { TypeOpenDialog } from '../EditDialog/EditDialog';
import InviteMembers from '../InviteMembers/InviteMembers';
import { PublicDialogEntity } from '../../../../../Domain/entity/PublicDialogEntity';
import YesNoQuestionComponent from '../YesNoQuestion/YesNoQuestion';
import MembersList from '../MembersList/MembersList';
import { DialogsViewModel } from '../../../../Views/Dialogs/DialogViewModel';
import { GroupDialogEntity } from '../../../../../Domain/entity/GroupDialogEntity';
import { stringifyError } from '../../../../../utils/parse';
import { FileEntity } from '../../../../../Domain/entity/FileEntity';
import UserAvatar from '../EditDialog/UserAvatar/UserAvatar';
import MainButton, { TypeButton } from '../../Buttons/MainButton/MainButton';
import useQbDataContext from '../../../providers/QuickBloxUIKitProvider/useQbDataContext';

type HeaderDialogsProps = {
  dialog: DialogEntity;
  dialogViewModel: DialogsViewModel;
  closeInformationHandler: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition
const DialogInformation: React.FC<HeaderDialogsProps> = ({
  dialog,
  dialogViewModel,
  closeInformationHandler,
}: HeaderDialogsProps) => {
  const currentContext = useQbDataContext();
  const currentUserId =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId.toString();
  const { handleModal } = React.useContext(ModalContext);
  const userViewModel = useUsersListViewModel(dialog);
  const [showMembersDialog, setShowMembersDialog] = React.useState(false);
  const [isAllMembersShow, setIsAllMembersShow] = React.useState(false);

  useEffect(() => {
    console.log('HAVE NEW DIALOG');
    if (dialog === undefined && closeInformationHandler) {
      console.log('HAVE UNDEFINED NEW DIALOG');
      closeInformationHandler();

      return;
    }
    userViewModel.entity = dialogViewModel.entity;

    setShowMembersDialog(false);
  }, [dialog, dialogViewModel.entity]);

  useEffect(() => {
    userViewModel.getUsers();
  }, [userViewModel.entity]);

  useEffect(() => {
    console.log('users list has changed in DialogInformation:');
    console.log(userViewModel.users);
  }, [userViewModel.users]);

  const searchDialogHandler = () => {
    console.log('searchDialogHandler');
  };
  const closeModal = () => {
    handleModal(false, '', '', false, false);
  };
  const leaveDialogHandler = () => {
    handleModal(
      true,
      <ColumnContainer gapBetweenItem="8px">
        <YesNoQuestionComponent
          noActionCaption="Cancel"
          yesActionCaption="Leave"
          ClickYesActionHandler={() => {
            dialogViewModel
              .deleteDialog(
                (dialogViewModel?.entity || dialog) as GroupDialogEntity,
              )
              .then((result) => {
                if (result) closeModal();

                return result;
              })
              .catch((e) => {
                console.log(
                  'exception in DeleteDialogHandler',
                  stringifyError(e),
                );
              });
          }}
          ClickNoActionHandler={() => {
            closeModal();
          }}
        />
      </ColumnContainer>,
      'Leave dialog?',
      false,
      true,
    );
  };
  const showMembersDialogHandler = () => {
    setShowMembersDialog(!showMembersDialog);
  };

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

      return <GroupChat width="51" height="51" color="var(--secondary-text)" />;
    }
    if (dialogEntity.type === DialogType.private) {
      return <User width="51" height="51" color="var(--secondary-text)" />;
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
        <PublicChannel width="51" height="51" color="var(--secondary-text)" />
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

  return isAllMembersShow ? (
    <MembersList
      closeInformationHandler={() => {
        setIsAllMembersShow(false);
      }}
      members={userViewModel.users}
    />
  ) : (
    <div className="dialog-information-container">
      <ColumnContainer maxWidth="320px">
        <div className="dialog-information-container--dialog-information-wrapper">
          <div className="dialog-information-container__dialog-information">
            <div>Dialog information</div>
          </div>
          <div className="dialog-information-container__dialog-information-close">
            <ActiveSvg
              content={<Close applyZoom color="var(--secondary-elements)" />}
              clickAction={() => {
                if (closeInformationHandler) {
                  closeInformationHandler();
                }
              }}
            />
          </div>
        </div>
        <div className="dialog-information-container--icon-dialog-wrapper">
          <div className="dialog-information-container__icon-dialog">
            <div className="dialog-information-container__icon-dialog__info">
              {dialog.type !== DialogType.private ? (
                <div className="dialog-information-container__icon-dialog__btn">
                  <ActiveButton
                    content="Edit"
                    clickAction={() => {
                      handleModal(
                        true,
                        <EditDialog
                          nameDialog={
                            dialogViewModel?.entity.name || dialog.name
                          }
                          typeDialog={
                            dialogViewModel?.entity.type || dialog.type
                          }
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
                      );
                    }}
                    touchAction={() => {
                      console.log('call touchAction');
                    }}
                  />
                </div>
              ) : null}

              <div className="dialog-information-container__icon-dialog__info__icon">
                <div className="dialog-information-container__icon-dialog__info__icon__content">
                  {renderIconForTypeDialog(dialogViewModel?.entity || dialog)}
                </div>
              </div>
              <div className="dialog-information-container__icon-dialog__info__dialog-name">
                {/* {dialog?.name} */}
                {dialogViewModel?.entity?.name || dialog?.name}
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-information-container--notifications-wrapper">
          <div className="dialog-information-container--notifications-wrapper__notifications-icon">
            <NotifyOn width="24" height="24" applyZoom />
          </div>
          <div className="dialog-information-container--notifications-wrapper__notifications">
            Notifications
          </div>
          <div
            onClick={() => {
              console.log('clicked SwitchButton theme');
              document.documentElement.setAttribute('data-theme', 'dark');

              // changeThemeActions();
            }}
            className="dialog-information-container--notifications-wrapper__notifications-button"
          >
            <SwitchButton
              clickHandler={() => {
                console.log('clicked SwitchButton theme');
              }}
            />
          </div>
        </div>

        {dialog.type !== DialogType.private ? (
          <div>
            <div className="dialog-information-container--members-wrapper">
              <div className="dialog-information-container--members-wrapper__members-icon">
                <GroupChat
                  width="24"
                  height="24"
                  applyZoom
                  color="var(--secondary-elements)"
                />
              </div>
              <div className="dialog-information-container--members-wrapper__members">
                Members
              </div>
              <div className="dialog-information-container--members-wrapper__members-button">
                <div className="dialog-information-container--members-wrapper__members-button__count">
                  <div className="dialog-information-container--members-wrapper__members-button__count__content">
                    {userViewModel.users.length}
                  </div>
                </div>
                <div className="dialog-information-container--members-wrapper__members-button__btn">
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
                    clickAction={() => showMembersDialogHandler()}
                    touchAction={() => console.log('showMembersDialogHandler')}
                  />
                </div>
              </div>
            </div>
            <div>
              {showMembersDialog ? (
                <ColumnContainer>
                  {userViewModel?.loading && (
                    <div
                      style={{
                        height: '44px',
                        width: '44px',
                      }}
                    >
                      <LoaderComponent width="44" height="44" />
                    </div>
                  )}
                  {userViewModel?.error && (
                    <ErrorComponent
                      title={userViewModel?.error}
                      ClickActionHandler={() => {
                        alert('call click retry');
                      }}
                    />
                  )}
                  {userViewModel.users && userViewModel.users.length > 0 && (
                    <div className="dialog-information-container--members-wrapper__members-list">
                      <UsersList
                        usersFirstPageToView={userViewModel.users}
                        allUsers={userViewModel.users}
                        usersInDialogCount={userViewModel.users.length}
                      />
                    </div>
                  )}
                  <div className="btn-container-members">
                    <div className="btn-container-members--wrapper">
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
                                console.log('apply invite users');
                                console.log(
                                  'HAVE SELECTED USERS: ',
                                  JSON.stringify(usersForInvite),
                                );

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
                                    // eslint-disable-next-line promise/always-return
                                    .then((data) => {
                                      console.log(
                                        'result update dialog: ',
                                        JSON.stringify(data),
                                      );
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
                                    // eslint-disable-next-line promise/always-return
                                    .then((data) => {
                                      console.log(
                                        'result removeMembers dialog: ',
                                        JSON.stringify(data),
                                      );
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
                        clickHandler={() => setIsAllMembersShow(true)}
                      />
                    </div>
                  </div>
                </ColumnContainer>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="dialog-information-container--search-wrapper">
          <div className="dialog-information-container--search-wrapper__search-icon">
            <ActiveSvg
              content={<Search width="24" height="24" applyZoom />}
              clickAction={() => searchDialogHandler()}
              touchAction={() => searchDialogHandler()}
            />
          </div>
          <div className="dialog-information-container--search-wrapper__search-text">
            Search in dialog
          </div>
        </div>
        <div className="dialog-information-container--leave-dialog-wrapper">
          <div className="dialog-information-container--leave-dialog-wrapper__leave-icon">
            <ActiveSvg
              content={<Leave width="24" height="24" applyZoom />}
              clickAction={() => {
                leaveDialogHandler();
              }}
              touchAction={() => {
                leaveDialogHandler();
              }}
            />
          </div>
          <div className="dialog-information-container--leave-dialog-wrapper__leave-text">
            Leave Dialog
          </div>
        </div>
      </ColumnContainer>
    </div>
  );
};

export default DialogInformation;
