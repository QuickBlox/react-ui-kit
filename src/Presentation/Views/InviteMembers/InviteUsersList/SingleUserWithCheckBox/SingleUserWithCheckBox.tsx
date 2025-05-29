import React from 'react';
import './SingleUserWithCheckBox.scss';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import ActiveSvg from '../../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import User from '../../../../components/UI/svgs/Icons/Contents/User';
import { useMobileLayout } from '../../../../components/containers/SectionList/hooks';
import UserAvatar from '../../../EditDialog/UserAvatar/UserAvatar';

export type FunctionTypeUserEntityToVoid = (
  item: UserEntity,
  checkedStatus: boolean,
) => void;

type SingleUserWithCheckBoxProps = {
  user: UserEntity;
  isElementChecked: boolean;
  isDisabled: boolean;
  checkedHandler: FunctionTypeUserEntityToVoid;
  keyValue?: number;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const SingleUserWithCheckBox: React.FC<SingleUserWithCheckBoxProps> = ({
  user,
  checkedHandler,
  isElementChecked,
  keyValue,
  isDisabled = false,
}) => {
  const [isMobile] = useMobileLayout();

  function getChecked(index: number | undefined) {
    const result = isElementChecked; // || isUserChecked;

    console.log(index);

    return result;
  }
  // const [dialogAvatarUrl, setDialogAvatarUrl] = React.useState('');
  // const getUserAvatarUid = () => {
  //   let result = '';
  //
  //   result = user?.blob_id || '';
  //
  //   return result;
  // };
  //
  // async function getDialogPhotoFileForPreview() {
  //   const fileUid: string = getUserAvatarUid();
  //
  //   if (fileUid && fileUid.length > 0) {
  //     let tmpFileUrl: string = fileUid && QB.content.privateUrl(fileUid);
  //     const { blobFile } = await Creator.createBlobFromUrl(tmpFileUrl);
  //
  //     tmpFileUrl = blobFile ? URL.createObjectURL(blobFile) : tmpFileUrl || '';
  //     setDialogAvatarUrl(tmpFileUrl);
  //   }
  // }
  // useEffect(() => {
  //   getDialogPhotoFileForPreview();
  //
  //   return () => {
  //     if (dialogAvatarUrl) {
  //       URL.revokeObjectURL(dialogAvatarUrl);
  //     }
  //   };
  // }, []);

  return (
    <div key={keyValue} className="user-single-container-chbox--wrapper">
      <div className="user-single-container-chbox--wrapper__icon">
        <ActiveSvg
          content={
            user.photo ? (
              <UserAvatar
                urlAvatar={user.photo}
                iconTheme={{ width: '41px', height: '41px' }}
              />
            ) : (
              <div className="user-single-container-chbox--wrapper__icon__content">
                <User
                  width="26"
                  height="26"
                  applyZoom
                  color="var(--tertiary-elements)"
                />
              </div>
            )
          }
          onClick={() => {
            console.log('user click...');
          }}
          onTouch={() => {
            console.log('user touch...');
          }}
        />
      </div>
      <div
        className="user-single-container-chbox--wrapper__username"
        style={isMobile ? { width: '133px' } : { width: '193px' }}
      >
        {`${user?.full_name || user?.login || user?.email || user?.id}`}
      </div>
      <div className="user-single-container-chbox--wrapper__select">
        <input
          type="checkbox"
          checked={getChecked(keyValue)}
          disabled={isDisabled}
          onChange={() => {
            console.log('have check in SingleUserWithCheckBox');
            const newStatus = !isElementChecked;

            if (checkedHandler) {
              checkedHandler(user, newStatus);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SingleUserWithCheckBox;
