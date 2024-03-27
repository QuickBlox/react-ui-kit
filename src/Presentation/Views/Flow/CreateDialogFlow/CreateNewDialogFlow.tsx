import React, { useEffect, useState } from 'react';
import CreateDialog from '../CreateDialog/CreateDialog';
import { DialogType } from '../../../../Domain/entity/DialogTypes';
import EditDialog, { TypeOpenDialog } from '../../EditDialog/EditDialog';
import InviteMembers from '../../InviteMembers/InviteMembers';
import { DialogListViewModel } from '../../DialogList/DialogListViewModel';
import { GroupDialogEntity } from '../../../../Domain/entity/GroupDialogEntity';
import { Stubs } from '../../../../Data/Stubs';
import { stringifyError } from '../../../../utils/parse';
import { EditDialogParams } from '../../../../CommonTypes/BaseViewModel';
import { FileEntity } from '../../../../Domain/entity/FileEntity';
import { qbDataContext } from '../../../providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import { RemoteDataSource } from '../../../../Data/source/remote/RemoteDataSource';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';

type CreateNewDialogFlowProps = {
  dialogsViewModel: DialogListViewModel;
  onFinished: (newEntity: DialogEntity) => void;
  onCancel?: () => void;
  isOnline: boolean;
};

// eslint-disable-next-line react/function-component-definition
const CreateNewDialogFlow: React.FC<CreateNewDialogFlowProps> = ({
  dialogsViewModel,
  onFinished,
  onCancel,
  isOnline,
}: CreateNewDialogFlowProps) => {
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
          onFinished(newEntity);
        })
        .catch((e) => {
          console.log('Have exception: ', stringifyError(e));
        });
      // }
    }
  };

  const closeModal = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: '100',
          display: isOnline ? 'none' : 'block',
        }}
      />
      {stepToCreate === setUpDialogType && (
        <CreateDialog
          createPrivateDialogOnClick={() => {
            setSelectedDialogType(DialogType.private);
          }}
          createPrivateDialogOnTouch={() => {
            setSelectedDialogType(DialogType.private);
          }}
          createGroupDialogOnClick={() => {
            setSelectedDialogType(DialogType.group);
          }}
          createGroupDialogOnTouch={() => {
            setSelectedDialogType(DialogType.group);
          }}
          createPublicDialogOnClick={() => {
            setSelectedDialogType(DialogType.public);
          }}
          createPublicDialogOnTouch={() => {
            setSelectedDialogType(DialogType.public);
          }}
        />
      )}
      {stepToCreate === setDialogTitle && (
        <div>
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
          typeAddEditDialog={TypeOpenDialog.create}
          idOwnerDialog={remoteDataSourceMock.authInformation!.userId.toString()}
        />
      )}
    </div>
  );
};

export default CreateNewDialogFlow;
