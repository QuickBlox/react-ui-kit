import React, { useEffect, useState } from 'react';
import CreateDialog from '../../components/UI/Dialogs/CreateDialog/CreateDialog';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import EditDialog, {
  TypeOpenDialog,
} from '../../components/UI/Dialogs/EditDialog/EditDialog';
import InviteMembers from '../../components/UI/Dialogs/InviteMembers/InviteMembers';
import { ModalContext } from '../../components/providers/ModalContextProvider/Modal';
import { DialogsViewModel } from '../Dialogs/DialogViewModel';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { Stubs } from '../../../Data/Stubs';
import { stringifyError } from '../../../utils/parse';
import { EditDialogParams } from '../Base/BaseViewModel';
import { FileEntity } from '../../../Domain/entity/FileEntity';
import { qbDataContext } from '../../components/providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import { RemoteDataSource } from '../../../Data/source/remote/RemoteDataSource';

type CreateNewDialogFlowProps = {
  dialogsViewModel: DialogsViewModel;
};

// eslint-disable-next-line react/function-component-definition
const CreateNewDialogFlow: React.FC<CreateNewDialogFlowProps> = ({
  dialogsViewModel,
}: CreateNewDialogFlowProps) => {
  const { handleModal } = React.useContext(ModalContext);
  const currentContext = React.useContext(qbDataContext);
  const remoteDataSourceMock: RemoteDataSource =
    currentContext.storage.REMOTE_DATA_SOURCE;
  const setUpDialogType = 1;
  const setDialogTitle = 2;
  const inviteUsers = 3;
  const [stepToCreate, setNumStepToCreate] = React.useState(setUpDialogType);
  const [selectedDialogType, setSelectedDialogType] = useState<DialogType>();
  const [dialogName, setDialogName] = React.useState<string>('NOT DEFINE');
  const [uidAvatar, setUidAvatar] = React.useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (
      // selectedDialogType === DialogType.private ||
      selectedDialogType === DialogType.group
    ) {
      setNumStepToCreate(setDialogTitle);
    } else if (selectedDialogType === DialogType.private) {
      setNumStepToCreate(inviteUsers);
    }
  }, [selectedDialogType]);

  const getDialogNameHandler = (params: EditDialogParams) => {
    console.log(params.dialogTitle);
    setDialogName(params.dialogTitle);

    let newUidAvatar: string | undefined = '';

    console.log('before urlPhoto: ', newUidAvatar);
    if (params.dialogAvatar) {
      if (params.dialogAvatar !== 'null') {
        dialogsViewModel
          .uploadFile(params.dialogAvatar as File)
          // eslint-disable-next-line promise/always-return
          .then((uploadedFile: FileEntity) => {
            newUidAvatar = uploadedFile.uid;

            console.log('after urlPhoto: ', newUidAvatar);
            setUidAvatar(newUidAvatar);

            setNumStepToCreate(inviteUsers);
          })
          .catch((error) => {
            console.log(stringifyError(error));
          });
      } else {
        setUidAvatar('null');
      }
    } else {
      setNumStepToCreate(inviteUsers);
    }
  };

  const getDialogParticipantsHandler = async (participants: number[]) => {
    if (
      selectedDialogType &&
      (DialogType.group === selectedDialogType ||
        (selectedDialogType === DialogType.private && participants.length > 0))
    ) {
      // if (
      //   selectedDialogType === DialogType.private &&
      //   participants.length > 0
      // )
      // {
      const dialog: GroupDialogEntity =
        Stubs.createDialogEntityByTypeWithDefaultValues(
          selectedDialogType,
        ) as GroupDialogEntity;

      dialog.name = dialogName;
      dialog.photo = uidAvatar || '';
      dialog.participantIds = participants;
      dialog.type = selectedDialogType;
      // eslint-disable-next-line promise/always-return
      await dialogsViewModel
        .createDialog(dialog)
        // eslint-disable-next-line promise/always-return
        .then((newEntity) => {
          handleModal(false, '', '', false, false);
          console.log(
            `HAVE CREATED DIALOG from param: ${JSON.stringify(
              newEntity,
            )} from viewmodel ${JSON.stringify(dialogsViewModel.entity)} `,
          );
        })
        .catch((e) => {
          console.log('Have exception: ', stringifyError(e));
        });
      // }
    }
  };

  const closeModal = () => {
    handleModal(false, '', '', false, false);
  };

  return (
    <div>
      {stepToCreate === setUpDialogType && (
        <CreateDialog
          createPrivateDialogClickHandler={() => {
            setSelectedDialogType(DialogType.private);
          }}
          createPrivateDialogTouchHandler={() => {
            setSelectedDialogType(DialogType.private);
          }}
          createGroupDialogClickHandler={() => {
            setSelectedDialogType(DialogType.group);
          }}
          createGroupDialogTouchHandler={() => {
            setSelectedDialogType(DialogType.group);
          }}
          createPublicDialogClickHandler={() => {
            setSelectedDialogType(DialogType.public);
          }}
          createPublicDialogTouchHandler={() => {
            setSelectedDialogType(DialogType.public);
          }}
        />
      )}
      {stepToCreate === setDialogTitle && (
        <div
        // style={{
        //   minHeight: '160px',
        //   minWidth: '380px',
        //   maxHeight: '160px',
        //   maxWidth: '380px',
        //   backgroundColor: 'var(--main-background)',
        //   border: '3px solid blue',
        // }}
        >
          <EditDialog
            nameDialog=""
            typeDialog={selectedDialogType!}
            typeAddEditDialog={TypeOpenDialog.create}
            clickUpdatedHandler={getDialogNameHandler}
            clickCancelHandler={() => {
              closeModal();
            }}
          />
        </div>
      )}
      {stepToCreate === inviteUsers && (
        <InviteMembers
          applyInviteUsersHandler={(selectedUsers) => {
            getDialogParticipantsHandler(selectedUsers);
          }}
          cancelInviteMembersHandler={() => {
            closeModal();
          }}
          typeDialog={selectedDialogType || DialogType.group}
          idOwnerDialog={remoteDataSourceMock.authInformation!.userId.toString()}
        />
      )}
    </div>
  );
};

export default CreateNewDialogFlow;
