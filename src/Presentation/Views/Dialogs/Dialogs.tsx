import React, { useEffect } from 'react';
import './Dialogs.scss';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import BaseViewModel, {
  FunctionTypeViewModelToVoid,
} from '../Base/BaseViewModel';
import PreviewDialogViewModel from '../../components/UI/Dialogs/PreviewDialog/PreviewDialogViewModel';
import PreviewDialog, {
  ThemeNames,
} from '../../components/UI/Dialogs/PreviewDialog/PreviewDialog';
import LoaderComponent from '../../components/UI/Placeholders/LoaderComponent/LoaderComponent';
import ErrorComponent from '../../components/UI/Placeholders/ErrorComponent/ErrorComponent';
import HeaderDialogs from '../../components/UI/Dialogs/HeaderDialogs/HeaderDialogs';
import { ModalContext } from '../../components/providers/ModalContextProvider/Modal';
import { DialogsViewModel } from './DialogViewModel';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import CreateNewDialogFlow from '../CreateDialogFlow/CreateNewDialogFlow';
import { getTimeShort24hFormat } from '../../../utils/DateTimeFormatter';
import { IconTheme } from '../../components/UI/svgs/Icons/IconsCommonTypes';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import Search from '../../components/UI/svgs/Icons/Navigation/Search';
import Remove from '../../components/UI/svgs/Icons/Actions/Remove';
import UiKitTheme from '../../assets/UiKitTheme';

type DialogsComponentSettings = {
  themeName?: ThemeNames;
  withoutHeader?: boolean;
  useSubHeader?: boolean;
  themeHeader?: UiKitTheme;
  themePreview?: UiKitTheme;
};

type DialogsProps = {
  header?: React.ReactNode;
  subHeaderContent?: React.ReactNode;
  itemSelectHandler?: FunctionTypeViewModelToVoid<DialogEntity>;
  dialogsViewModel: DialogsViewModel;
  additionalSettings?: DialogsComponentSettings;
};

// eslint-disable-next-line react/function-component-definition
const DialogsComponent: React.FC<DialogsProps> = ({
  header,
  subHeaderContent,
  itemSelectHandler,
  dialogsViewModel,
  additionalSettings = undefined,
}: DialogsProps) => {
  const dialogs: PreviewDialogViewModel[] = [];
  const [dialogsToView, setDialogsToView] = React.useState<
    PreviewDialogViewModel[]
  >([]);

  const [selectedItem, setSelectedItem] = React.useState<{
    selectedIndex: number | undefined;
    item: BaseViewModel<DialogEntity> | undefined;
  }>({ selectedIndex: undefined, item: undefined });

  const [showSearchDialogs, setShowSearchDialogs] = React.useState(false);
  const [nameDialogForSearch, setNameDialogForSearch] = React.useState('');

  useEffect(() => {
    console.log('USE EFFECT DIALOG LIST HAS CHANGED');
    console.log(JSON.stringify(dialogsViewModel?.dialogs));
    dialogs.slice(0);

    dialogsViewModel?.dialogs.forEach((entiy, index) => {
      const pw: PreviewDialogViewModel = new PreviewDialogViewModel(
        (it) => {
          if (itemSelectHandler) {
            setSelectedItem({ selectedIndex: index, item: it });
            itemSelectHandler(it);
          }
        },
        (it) => {
          if (itemSelectHandler) {
            setSelectedItem({ selectedIndex: index, item: it });
            itemSelectHandler(it);
          }
        },
        // Number(entiy.id),
        // entiy.name,
        entiy,
      );

      if (selectedItem && selectedItem.selectedIndex === index) {
        pw.isSelected = true;
      }
      dialogs.push(pw);
    });

    setDialogsToView(dialogs);
  }, [dialogsViewModel?.dialogs]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchMoreData = () => {
    console.log(
      'call fetchMoreData with: pagination: ',
      JSON.stringify(dialogsViewModel?.pagination),
      'View length: ',
      dialogsToView.length,
      'Model length: ',
      dialogsViewModel?.dialogs.length,
    );
    if (
      dialogsViewModel?.dialogs.length === dialogsToView.length &&
      dialogsViewModel?.pagination?.hasNextPage()
    ) {
      // setDialogsToView((prevState) => {
      //   const newState = [...prevState];
      //
      //   const newDialogEntity: DialogEntity =
      //     dialogsViewModel?.dialogs[prevState.length];
      //
      //   newState.push(newDialogEntity);
      //
      //   return newState;
      // });
      const newPagination = dialogsViewModel?.pagination;

      newPagination.perPage = 6;
      newPagination.nextPage(); // curPage + 1

      console.log(
        'call fetchMoreData with: pagination: ',
        JSON.stringify(newPagination),
        'View length: ',
        dialogsToView.length,
        'Model length: ',
        dialogsViewModel?.dialogs.length,
      );
      // eslint-disable-next-line @typescript-eslint/await-thenable
      dialogsViewModel?.getDialogs(newPagination);
    }
  };

  // useEffect(() => {
  //   const firstPagination = new Pagination(1, 1000);
  //
  //   console.log(
  //     'useEffect DialogsComponent, getDialogs(): ',
  //     JSON.stringify(firstPagination),
  //   );
  //   dialogsViewModel?.getDialogs(firstPagination);
  // }, []);

  const { handleModal } = React.useContext(ModalContext);
  const useHeader = !additionalSettings?.withoutHeader || header || false;
  const useSubContent =
    additionalSettings?.useSubHeader || subHeaderContent || false;
  const usingHeader = header || (
    <HeaderDialogs
      title="Dialogs"
      clickSearchHandler={() => {
        setShowSearchDialogs(!showSearchDialogs);
        setNameDialogForSearch('');
      }}
      ClickActionHandler={() => {
        handleModal(
          true,
          <CreateNewDialogFlow dialogsViewModel={dialogsViewModel} />,
          'New dialog',
          false,
          false,
          {
            minHeight: '200px',
            minWidth: '380px',
            maxWidth: '380px',
            backgroundColor: 'var(--main-background)',
            // border: '3px solid red',
          },
        );
      }}
    />
  );

  const renderPreviewDialog = (item: PreviewDialogViewModel, index: number) => {
    function getMessageDateTimeSent() {
      let dateInt = 0;
      let formattedValue = '';

      if (item.entity.lastMessage.dateSent) {
        dateInt = parseInt(item.entity.lastMessage.dateSent, 10);
        if (Number.isNaN(dateInt)) {
          return formattedValue;
        }
        formattedValue = getTimeShort24hFormat(dateInt);
      }

      return formattedValue;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function isMute(entity: DialogEntity) {
      return false;
    }

    const getDialogAvatar = (
      currentDialog: PreviewDialogViewModel,
    ): JSX.Element | undefined => {
      let AvatarComponent: JSX.Element | undefined;

      if (
        currentDialog.entity.type === DialogType.group ||
        currentDialog.entity.type === DialogType.public
      ) {
        const imagePhoto = (currentDialog.entity as GroupDialogEntity).photo;

        console.log('Dialogs: avatar: ', imagePhoto || 'NO FOTO');
        AvatarComponent = imagePhoto ? (
          <img
            style={{ width: '55px', height: '55px', borderRadius: '50%' }}
            src={imagePhoto}
          />
        ) : undefined;
      }

      return AvatarComponent;
    };

    return (
      <div
        key={index}
        onClick={() => {
          setDialogsToView((prevState) => {
            const newState = [...prevState];

            if (selectedItem && selectedItem.selectedIndex) {
              newState[selectedItem.selectedIndex].isSelected = false;
            }
            newState[index].isSelected = true;

            return newState;
          });
        }}
      >
        <PreviewDialog
          typeDialog={item?.entity?.type || DialogType.group}
          dialogViewModel={item}
          theme={{
            themeName:
              additionalSettings?.themeName === 'dark' ? 'dark' : 'light',
            selected: item.isSelected,
            muted: isMute(item.entity),
          }}
          title={`${item.entity.name || ''}`}
          unreadMessageCount={
            item.entity.unreadMessageCount > 0
              ? item.entity.unreadMessageCount
              : undefined
          }
          message_date_time_sent={getMessageDateTimeSent()}
          previewMessage={item.entity.lastMessage.text}
          dialogAvatar={getDialogAvatar(item)}
        />
      </div>
    );
  };

  const loaderTheme: IconTheme = {
    color: 'var(--divider)',
    width: '42',
    height: '42',
  };

  const renderSearchDialogs = () => {
    return (
      <div className="search-dialog-name-input">
        <Search
          applyZoom
          width="24"
          height="24"
          color="var(--tertiary-elements)"
        />
        <input
          type="text"
          style={{ width: '268px' }}
          value={nameDialogForSearch}
          onChange={(event) => {
            setNameDialogForSearch(event.target.value);
          }}
          placeholder="Search"
        />
        {nameDialogForSearch.length > 0 ? (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setNameDialogForSearch('');
            }}
          >
            <Remove width="24" height="24" color="var(--tertiary-elements)" />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '800px',
        minWidth: '322px',
        border: '1px solid var(--divider)',
      }}
    >
      <ColumnContainer>
        {useHeader && usingHeader}
        {/* {showSearchDialogs ? renderSearchDialogs() : null} */}
        {useSubContent && subHeaderContent}
        {dialogsViewModel?.loading && (
          // <div style={{ maxHeight: '44px', minHeight: '44px', height: '44px' }}>
          //   <LoaderComponent width="44" height="44" color="var(--divider)" />
          // </div>
          <LoaderComponent
            width={loaderTheme.width}
            height={loaderTheme.height}
            color={loaderTheme.color}
          />
        )}
        {dialogsViewModel?.error && (
          <ErrorComponent
            title="Something is wrong."
            ClickActionHandler={() => {
              alert('call click retry');
            }}
          />
        )}
        {/* <div className="scroll-box"> */}
        <div className="scroll-box">
          {showSearchDialogs ? renderSearchDialogs() : null}
          {nameDialogForSearch.length > 0 &&
            dialogsToView
              .filter((item) =>
                item.entity.name.includes(nameDialogForSearch, 0),
              )
              .map((item, index) => renderPreviewDialog(item, index))}
          {nameDialogForSearch.length === 0 &&
            (dialogsToView && dialogsToView.length) > 0 &&
            dialogsToView.map((item, index) =>
              renderPreviewDialog(item, index),
            )}

          {/* /!* eslint-disable-next-line no-nested-ternary *!/ */}
          {/* {nameDialogForSearch.length > 0 ? ( */}
          {/*  dialogsToView */}
          {/*    .filter((item) => */}
          {/*      item.entity.name.includes(nameDialogForSearch, 0), */}
          {/*    ) */}
          {/*    .map((item, index) => renderPreviewDialog(item, index)) */}
          {/* ) : (dialogsToView && dialogsToView.length) > 0 ? ( */}
          {/*  dialogsToView.map((item, index) => renderPreviewDialog(item, index)) */}
          {/* ) : ( */}
          {/*  <div>Create new chat</div> */}
          {/* )} */}
          {/* {dialogsToView && dialogsToView.length > 0 ? ( */}
          {/*  dialogsToView.map((item, index) => renderPreviewDialog(item, index)) */}
          {/* ) : ( */}
          {/*  // <ScrollableContainer */}
          {/*  //   data={dialogsToView} */}
          {/*  //   renderItem={renderPreviewDialog} */}
          {/*  //   onEndReached={fetchMoreData} */}
          {/*  //   // onEndReachedThreshold={0.8} */}
          {/*  //   refreshing={dialogsViewModel?.loading} */}
          {/*  // /> */}
          {/*  // */}
          {/*  <div>Create new chat</div> */}
          {/* )} */}
        </div>
      </ColumnContainer>
    </div>
  );
};

export default DialogsComponent;
