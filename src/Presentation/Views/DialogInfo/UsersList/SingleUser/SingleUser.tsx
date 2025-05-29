import React from 'react';
import './SingleUser.scss';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import User from '../../../../components/UI/svgs/Icons/Contents/User';
import UserAvatar from '../../../EditDialog/UserAvatar/UserAvatar';

type UserSingleProps = {
  user: UserEntity;
  keyValue?: number;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const UserSingle: React.FC<UserSingleProps> = ({ user, keyValue }) => {
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
    <div className="list-single-user">
      {user.photo ? (
        <UserAvatar
          urlAvatar={user.photo}
          iconTheme={{ width: '41px', height: '41px' }}
        />
      ) : (
        <div className="list-single-user-avatar">
          <div className="list-single-user-avatar-rectangle" />
          <div className="list-single-user-avatar-ellipse" />
          <div className="list-single-user-contents-user">
            <User
              width="26"
              height="26"
              applyZoom
              color="var(--tertiary-elements)"
            />
          </div>
        </div>
      )}
      <div className="list-single-user-subtitle">
        {user?.full_name || user?.login || user?.email || user?.id}
      </div>
    </div>
  );
};

export default UserSingle;
