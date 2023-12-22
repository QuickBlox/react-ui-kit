import React, { useEffect } from 'react';
import './DialogList.scss';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import BaseViewModel, {
  FunctionTypeViewModelToVoid,
} from '../../../CommonTypes/BaseViewModel';
import PreviewDialogViewModel from '../PreviewDialog/PreviewDialogViewModel';
import PreviewDialog, { ThemeNames } from '../PreviewDialog/PreviewDialog';
import LoaderComponent from '../../components/UI/Placeholders/LoaderComponent/LoaderComponent';
import ErrorComponent from '../../components/UI/Placeholders/ErrorComponent/ErrorComponent';
import DialogListHeader from '../DialogListHeader/DialogListHeader';
import { ModalContext } from '../../providers/ModalContextProvider/Modal';
import { DialogListViewModel } from './DialogListViewModel';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import CreateNewDialogFlow from '../CreateDialogFlow/CreateNewDialogFlow';
import { getTimeShort24hFormat } from '../../../utils/DateTimeFormatter';
import { IconTheme } from '../../components/UI/svgs/Icons/IconsCommonTypes';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import Search from '../../components/UI/svgs/Icons/Navigation/Search';
import Remove from '../../components/UI/svgs/Icons/Actions/Remove';
import UiKitTheme from '../../themes/UiKitTheme';

type DialogsComponentSettings = {
  themeName?: ThemeNames;
  withoutHeader?: boolean;
  useSubHeader?: boolean;
  useUpHeader?: boolean;
  themeHeader?: UiKitTheme;
  themePreview?: UiKitTheme;
};

type DialogsProps = {
  header?: React.ReactNode;
  subHeaderContent?: React.ReactNode;
  upHeaderContent?: React.ReactNode;
  onDialogSelectHandler?: FunctionTypeViewModelToVoid<DialogEntity>;
  dialogsViewModel: DialogListViewModel;
  additionalSettings?: DialogsComponentSettings;
  scrollableHeight?: number;
};

// eslint-disable-next-line react/function-component-definition
const DialogList: React.FC<DialogsProps> = ({
  header,
  subHeaderContent,
  upHeaderContent,
  onDialogSelectHandler,
  dialogsViewModel,
  additionalSettings = undefined,
  scrollableHeight = 736,
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
          if (onDialogSelectHandler) {
            setSelectedItem({ selectedIndex: index, item: it });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onDialogSelectHandler(it);
          }
        },
        (it) => {
          if (onDialogSelectHandler) {
            setSelectedItem({ selectedIndex: index, item: it });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onDialogSelectHandler(it);
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
  //     'useEffect DialogList, getDialogs(): ',
  //     JSON.stringify(firstPagination),
  //   );
  //   dialogsViewModel?.getDialogs(firstPagination);
  // }, []);

  const { handleModal } = React.useContext(ModalContext);
  const useHeader = !additionalSettings?.withoutHeader || header || false;
  const useSubContent =
    additionalSettings?.useSubHeader || subHeaderContent || false;
  const useUpContent =
    additionalSettings?.useUpHeader || upHeaderContent || false;
  const HeaderContent = header || (
    <DialogListHeader
      title="Dialogs"
      clickSearchHandler={() => {
        setShowSearchDialogs(!showSearchDialogs);
        setNameDialogForSearch('');
      }}
      clickActionHandler={() => {
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
      theme={additionalSettings?.themeHeader}
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
        formattedValue = getTimeShort24hFormat(dateInt * 1000);
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

        // console.log('DialogList: renderAvatar: ', imagePhoto || 'NO FOTO');
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
            colorTheme: additionalSettings?.themePreview,
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
    color: 'var(--color-background-info)',
    width: '44',
    height: '44',
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
          // style={{ width: '268px' }}
          style={{ width: '85%' }}
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
      className="dialog-list"
      // style={{
      //   minHeight: '800px',
      //   minWidth: '322px',
      //   width: `${100}%`,
      //   border: '1px solid var(--divider)',
      // }}
    >
      <ColumnContainer>
        {useUpContent && upHeaderContent}
        {useHeader && HeaderContent}
        {useSubContent && subHeaderContent}
        {/* <div className="scroll-box"> */}
        <div
          className="scroll-box"
          style={{ maxHeight: 'initial' }}
          ref={(el) => {
            if (el) {
              el.style.setProperty(
                'max-height',
                `${scrollableHeight}px`,
                'important',
              );
            }
          }}
        >
          {dialogsViewModel?.loading && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  height: '44px',
                  width: '44px',
                }}
              >
                <LoaderComponent
                  width={loaderTheme.width}
                  height={loaderTheme.height}
                  color={loaderTheme.color}
                />
              </div>
            </div>
          )}
          {dialogsViewModel?.error && (
            <ErrorComponent
              title="Something is wrong."
              ClickActionHandler={() => {
                alert('call click retry');
              }}
            />
          )}
          {showSearchDialogs ? renderSearchDialogs() : null}
          {nameDialogForSearch.length > 0 &&
            dialogsToView
              .filter((item) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                item.entity.name
                  .toUpperCase()
                  .includes(nameDialogForSearch.toUpperCase(), 0),
              )
              .map((item, index) => renderPreviewDialog(item, index))}
          {nameDialogForSearch.length === 0 &&
            (dialogsToView && dialogsToView.length) > 0 &&
            dialogsToView.map((item, index) =>
              renderPreviewDialog(item, index),
            )}
        </div>
      </ColumnContainer>
    </div>
  );
};

export default DialogList;
