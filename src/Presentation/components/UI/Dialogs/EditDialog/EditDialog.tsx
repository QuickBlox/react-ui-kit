import React, { useEffect, useState } from 'react';
import './EditDialog.scss';
import ColumnContainer from '../../../containers/ColumnContainer/ColumnContainer';
import User from '../../svgs/Icons/Contents/User';
import RowRightContainer from '../../../containers/RowRightContainer/RowRightContainer';
import MainButton, { TypeButton } from '../../Buttons/MainButton/MainButton';
import {
  EditDialogParams,
  FunctionTypeEditDialogParamsToVoid,
  FunctionTypeVoidToVoid,
} from '../../../../Views/Base/BaseViewModel';
import UserAvatar from './UserAvatar/UserAvatar';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import GroupChat from '../../svgs/Icons/Contents/GroupChat';
import PublicChannel from '../../svgs/Icons/Contents/PublicChannel';
// import { QBCreateAndUploadContent } from '../../../../../qb-api-calls';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ulrIcon = '',
  typeAddEditDialog = TypeOpenDialog.create,
  clickUpdatedHandler,
  clickCancelHandler,
}) => {
  const minLengthNameDialog = 3;
  const maxLengthNameDialog = 60;
  const [dialogName, setDialogName] = useState(nameDialog);
  const [fileUploadAvatar, setFileUploadAvatar] = useState<File | null>(null);
  const [urlAvatar, setUrlAvatar] = useState(ulrIcon || '');
  const [disabledButton, setDisabledButton] = useState<boolean>(
    nameDialog.length < minLengthNameDialog ||
      nameDialog.length > maxLengthNameDialog,
  );

  useEffect(() => {
    setDisabledButton(
      dialogName.length < minLengthNameDialog ||
        dialogName.length > maxLengthNameDialog,
    );
  }, [dialogName]);

  const ChangeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;

    reader.onloadend = () => {
      setFileUploadAvatar(file);
      setUrlAvatar(reader.result ? (reader.result as string) : '');
    };

    if (file !== null) reader.readAsDataURL(file);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const imgUrl = urlAvatar; // event.currentTarget.files[0].name;

    // TODO: upload file to server
    console.log('imgUrl :', imgUrl);
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
          break;
        case DialogType.group:
          return (
            <GroupChat
              width="36"
              height="36"
              applyZoom
              color="var(--secondary-text)"
            />
          );
          break;
        case DialogType.public:
          return (
            <PublicChannel
              width="36"
              height="36"
              applyZoom
              color="var(--secondary-text)"
            />
          );
          break;
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
          clickRemoveAvatarHandler={() => setUrlAvatar('null')}
        />
      );
    }
  };

  return (
    <ColumnContainer gapBetweenItem="8px">
      <div
        style={{
          // maxHeight: '236px',
          // maxWidth: '380px',
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
                    // onChange={uploadIconHandler}
                    onChange={(event) => {
                      ChangeFileHandler(event);
                    }}
                    disabled={typeDialog === DialogType.private}
                  />
                </label>
              </div>
            </div>
            <div className="edit-dialog-container--wrapper__dialog-name-inf">
              Dialog name
            </div>
            <div className="edit-dialog-container--wrapper__dialog-name-input">
              <input
                type="text"
                style={{ width: '280px' }}
                value={dialogName?.length > 0 ? dialogName : undefined}
                onChange={(event) => setDialogName(event.target.value)}
                placeholder="Enter name"
              />
            </div>
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
              <div>
                <MainButton
                  clickHandler={() => {
                    if (clickUpdatedHandler) {
                      if (urlAvatar !== 'null') {
                        setUrlAvatar(
                          fileUploadAvatar === null
                            ? ''
                            : fileUploadAvatar.name,
                        );
                      }

                      const params: EditDialogParams = {
                        dialogTitle: dialogName,
                        dialogAvatar:
                          urlAvatar === 'null' ? 'null' : fileUploadAvatar,
                      };

                      clickUpdatedHandler(params);
                    }
                  }}
                  title={
                    typeAddEditDialog === TypeOpenDialog.create
                      ? 'Next'
                      : 'Save'
                  }
                  typeButton={TypeButton.default}
                  disabled={disabledButton}
                />
              </div>
            }
            CenterContainerSize={{
              flexBasis: '78px',
              minWidth: '78px',
              maxWidth: '78px',
              minHeight: '32px',
              maxHeight: '32px',
            }}
            CenterItem={
              <div>
                <MainButton
                  title="Cancel"
                  clickHandler={() => {
                    if (clickCancelHandler) {
                      clickCancelHandler();
                    }
                  }}
                  typeButton={TypeButton.outlined}
                />
              </div>
            }
          />
        </div>
      </div>
    </ColumnContainer>
  );
};

export default EditDialog;
