import React, { useEffect, useState } from 'react';
import './EditDialog.scss';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import User from '../../components/UI/svgs/Icons/Contents/User';
import RowRightContainer from '../../components/containers/RowRightContainer/RowRightContainer';
import {
  EditDialogParams,
  FunctionTypeEditDialogParamsToVoid,
  FunctionTypeVoidToVoid,
} from '../../../CommonTypes/BaseViewModel';
import UserAvatar from './UserAvatar/UserAvatar';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import GroupChat from '../../components/UI/svgs/Icons/Contents/GroupChat';
import PublicChannel from '../../components/UI/svgs/Icons/Contents/PublicChannel';
import useQbInitializedDataContext from '../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { Button, TextField } from '../../ui-components';

export const TypeOpenDialog = {
  edit: 'edit',
  create: 'create',
} as const;

export type OpenDialogArcheType = keyof typeof TypeOpenDialog;

type EditDialogProps = {
  nameDialog: string;
  typeDialog: DialogType;
  ulrIcon?: string;
  typeAddEditDialog: OpenDialogArcheType;
  clickUpdatedHandler?: FunctionTypeEditDialogParamsToVoid;
  clickCancelHandler?: FunctionTypeVoidToVoid;
};

// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const EditDialog: React.FC<EditDialogProps> = ({
  nameDialog = '',
  typeDialog,
  ulrIcon = '',
  typeAddEditDialog = TypeOpenDialog.create,
  clickUpdatedHandler,
  clickCancelHandler,
}) => {
  const currentContext = useQbInitializedDataContext();
  const maxUploadFileSize = currentContext.InitParams.maxFileSize;
  const minLengthNameDialog = 3;
  const maxLengthNameDialog = 60;
  const errorMessageUploadMaxSize = `file size must be less than ${
    maxUploadFileSize / 1024 / 1024
  } Mb`;

  const [dialogName, setDialogName] = useState(nameDialog);
  const [fileUploadAvatar, setFileUploadAvatar] = useState<File | null>(null);
  const [urlAvatar, setUrlAvatar] = useState(ulrIcon || '');
  const [disabledButton, setDisabledButton] = useState<boolean>(
    nameDialog.length < minLengthNameDialog ||
      nameDialog.length > maxLengthNameDialog,
  );
  const [errorMessageUpload, setErrorMessageUpload] = useState('');

  const handleUploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedExtensions = ['jpg', 'jpeg', 'gif', 'png'];

    setErrorMessageUpload('');
    const reader = new FileReader();
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;

    if (file === null) return;

    if (!allowedExtensions.includes(file.type.split('/')[1])) {
      setErrorMessageUpload('Please use JPG, JPEG, PNG, or GIF.');

      return;
    }

    const fileSize = file?.size || 0;

    if (fileSize >= maxUploadFileSize) {
      setErrorMessageUpload(errorMessageUploadMaxSize);

      return;
    }

    reader.onloadend = () => {
      setFileUploadAvatar(file);
      setUrlAvatar(reader.result ? (reader.result as string) : '');
    };

    if (file !== null) reader.readAsDataURL(file);
  };

  // eslint-disable-next-line consistent-return
  const renderAvatar = () => {
    if (urlAvatar.length < 1 || urlAvatar === 'null') {
      switch (typeDialog) {
        case DialogType.private:
          return (
            <User
              width="36"
              height="36"
              applyZoom
              color="var(--secondary-text)"
            />
          );
        case DialogType.group:
          return (
            <GroupChat
              width="36"
              height="36"
              applyZoom
              color="var(--secondary-text)"
            />
          );
        case DialogType.public:
          return (
            <PublicChannel
              width="36"
              height="36"
              applyZoom
              color="var(--secondary-text)"
            />
          );
        default:
          return (
            <User
              width="36"
              height="36"
              applyZoom
              color="var(--secondary-text)"
            />
          );
      }
    } else {
      return (
        <UserAvatar
          urlAvatar={urlAvatar}
          clickRemoveAvatarHandler={() => {
            setUrlAvatar('');
            setErrorMessageUpload('');
          }}
        />
      );
    }
  };

  useEffect(() => {
    setDisabledButton(
      dialogName.length < minLengthNameDialog ||
        dialogName.length > maxLengthNameDialog,
    );
  }, [dialogName]);

  const handleUpdate = () => {
    if (clickUpdatedHandler) {
      const params: EditDialogParams = {
        dialogTitle: dialogName,
        dialogAvatar: urlAvatar.length ? fileUploadAvatar : '',
      };

      clickUpdatedHandler(params);
    }
  };

  const handleCancel = () => {
    if (clickCancelHandler) {
      clickCancelHandler();
    }
  };

  return (
    <ColumnContainer gapBetweenItem="8px">
      <div
        style={{
          backgroundColor: 'var(--main-background)',
        }}
        className="edit-container"
      >
        <div className="edit-dialog-container">
          <div className="edit-dialog-container--wrapper">
            <div className="edit-dialog-container--wrapper__inf">
              Dialog image
            </div>
            <div className="edit-dialog-container--wrapper__icon-container">
              <div className="edit-dialog-container--wrapper__icon-container__icon">
                <div className="edit-dialog-container--wrapper__icon-container__icon__content">
                  {renderAvatar()}
                </div>
              </div>
              <div className="edit-dialog-container--wrapper__icon-container__upload">
                <label
                  htmlFor="uploadBtn"
                  style={{
                    cursor: typeDialog !== DialogType.private ? 'pointer' : '',
                  }}
                >
                  <div>{typeDialog !== DialogType.private ? 'Upload' : ''}</div>
                  <input
                    id="uploadBtn"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      handleUploadAvatar(event);
                    }}
                    disabled={typeDialog === DialogType.private}
                  />
                </label>
              </div>
            </div>
            {errorMessageUpload.length > 0 ? (
              <div className="edit-dialog-container--wrapper__upload-error">
                {errorMessageUpload}
              </div>
            ) : null}
            <div className="edit-dialog-container--wrapper__dialog-name-inf">
              Dialog name
            </div>
            <TextField
              value={dialogName}
              onChange={(value) => setDialogName(value)}
              placeholder="Enter name"
              className="edit-dialog-container--wrapper__text-field"
            />
          </div>
        </div>
        <div className="edit-btn-container">
          <RowRightContainer
            minHeightContainer="32px"
            gapBetweenItem="8px"
            RightContainerSize={{
              flexBasis: '63px',
              minWidth: '63px',
              maxWidth: '63px',
              minHeight: '32px',
              maxHeight: '32px',
            }}
            RightItem={
              <Button onClick={handleUpdate} disabled={disabledButton}>
                {typeAddEditDialog === TypeOpenDialog.create ? 'Next' : 'Save'}
              </Button>
            }
            CenterContainerSize={{
              flexBasis: '78px',
              minWidth: '78px',
              maxWidth: '78px',
              minHeight: '32px',
              maxHeight: '32px',
            }}
            CenterItem={
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            }
          />
        </div>
      </div>
    </ColumnContainer>
  );
};

export default EditDialog;
