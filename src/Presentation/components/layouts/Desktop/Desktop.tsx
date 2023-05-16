import React, { useEffect } from 'react';
import './DesktopLayout.scss';
import ColumnContainer from '../../containers/ColumnContainer/ColumnContainer';
import BaseViewModel from '../../../Views/Base/BaseViewModel';
import { ModalContext } from '../../providers/ModalContextProvider/Modal';
import DialogsComponent from '../../../Views/Dialogs/Dialogs';
import HeaderDialogs from '../../UI/Dialogs/HeaderDialogs/HeaderDialogs';
import DialogInformation from '../../UI/Dialogs/DialogInformation/DialogInformation';
import { DialogsViewModel } from '../../../Views/Dialogs/DialogViewModel';
import useDialogsViewModel from '../../../Views/Dialogs/useDialogsViewModel';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
import { Pagination } from '../../../../Domain/repository/Pagination';
import CreateDialog from '../../UI/Dialogs/CreateDialog/CreateDialog';

function Desktop() {
  console.log('create DesktopLayoutDesktopLayout');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { handleModal } = React.useContext(ModalContext);
  const [selectedDialog, setSelectedDialog] =
    React.useState<BaseViewModel<DialogEntity>>();

  const dialogsViewModel: DialogsViewModel = useDialogsViewModel();

  useEffect(() => {
    console.log('DESKTOP USE EFFECT in DesktopLayoutDesktopLayout');
    const pagination: Pagination = new Pagination();

    dialogsViewModel?.getDialogs(pagination);

    return () => {
      // console.log('call removeListener()');
      // listChatsViewModel?.removeListener();
    };
  }, []);

  return (
    <div className="desktop-layout-main-container">
      <div className="desktop-layout-main-container__item-left">
        <DialogsComponent
          dialogsViewModel={dialogsViewModel}
          itemSelectHandler={setSelectedDialog}
          header={
            <HeaderDialogs
              title="Dialogs"
              ClickActionHandler={() => {
                handleModal(
                  true,
                  <CreateDialog
                    createPrivateDialogClickHandler={() =>
                      console.log('click private')
                    }
                    createPrivateDialogTouchHandler={() =>
                      console.log('touch private')
                    }
                    createGroupDialogClickHandler={() =>
                      console.log('click group')
                    }
                    createGroupDialogTouchHandler={() =>
                      console.log('touch group')
                    }
                    createPublicDialogClickHandler={() =>
                      console.log('click public')
                    }
                    createPublicDialogTouchHandler={() =>
                      console.log('touch public')
                    }
                  />,
                  'New dialog',
                  false,
                  false,
                );
              }}
            />
          }
        />
      </div>
      <div className="desktop-layout-main-container__item-center">2</div>
      <div className="desktop-layout-main-container__item-right">
        <ColumnContainer>
          {/* selected dialog: */}
          {/* {selectedDialog?.entity.name} */}
          {/* <br /> */}
          {/* id: */}
          {/* {selectedDialog?.entity.id} */}
          {/* <hr /> */}
          {selectedDialog ? (
            <DialogInformation
              dialog={selectedDialog.entity}
              dialogViewModel={dialogsViewModel}
              closeInformationHandler={() => {
                console.log('close dialog');
              }}
            />
          ) : (
            <div>Select dialog to chatting</div>
          )}
        </ColumnContainer>
      </div>
    </div>
  );
}

export default Desktop;
