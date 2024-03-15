import React, { useEffect } from 'react';
import cn from 'classnames';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import BaseViewModel, {
  FunctionTypeDialogEntityToVoid,
  FunctionTypeViewModelToVoid,
  FunctionTypeVoidToVoid,
} from '../../../CommonTypes/BaseViewModel';
import PreviewDialogViewModel from '../PreviewDialog/PreviewDialogViewModel';
import PreviewDialog, { ThemeNames } from '../PreviewDialog/PreviewDialog';
import ErrorComponent from '../../components/UI/Placeholders/ErrorComponent/ErrorComponent';
import { DialogListViewModel } from './DialogListViewModel';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import UiKitTheme from '../../themes/UiKitTheme';
import { useMobileLayout } from '../../components/containers/SectionList/hooks';
import { getDateForDialog } from '../../../utils/DateTimeFormatter';
import Header from '../../ui-components/Header/Header';
import { NewChatSvg, SearchSvg } from '../../icons';
import './DialogList.scss';
import '../DialogListHeader/DialogListHeader.scss';
import '../../ui-components/Header/Header.scss';
import Avatar from '../../ui-components/Avatar/Avatar';
import Loader from '../../ui-components/Loader/Loader';
import TextField from '../../ui-components/TextField/TextField';
import { Placeholder } from '../../ui-components';
import { ReactComponent as ChatSvg } from '../../icons/contents/chat.svg';

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
  selectedDialog?: DialogEntity;
  onDialogSelected?: FunctionTypeViewModelToVoid<DialogEntity>;
  onLeaveDialog: FunctionTypeDialogEntityToVoid;
  onCreateDialog?: FunctionTypeVoidToVoid;
  dialogListViewModel: DialogListViewModel;
  additionalSettings?: DialogsComponentSettings;
  scrollableHeight?: number;
};

// eslint-disable-next-line react/function-component-definition
const DialogList: React.FC<DialogsProps> = ({
  header,
  subHeaderContent,
  upHeaderContent,
  selectedDialog = undefined,
  onDialogSelected,
  onLeaveDialog,
  onCreateDialog,
  dialogListViewModel,
  additionalSettings = undefined,
  scrollableHeight = 736,
}: DialogsProps) => {
  const dialogs: PreviewDialogViewModel[] = [];
  const [dialogsToView, setDialogsToView] = React.useState<
    PreviewDialogViewModel[]
  >([]);

  // const [selectedItem, setSelectedItem] = React.useState<{
  //   selectedIndex: number | undefined;
  //   item: BaseViewModel<DialogEntity> | undefined;
  // }>({ selectedIndex: undefined, item: undefined });

  const [selectedItem, setSelectedItem] = React.useState<
    BaseViewModel<DialogEntity> | undefined
  >(undefined);

  const [showSearchDialogs, setShowSearchDialogs] = React.useState(false);
  const [nameDialogForSearch, setNameDialogForSearch] = React.useState('');
  const [isMobile] = useMobileLayout();

  useEffect(() => {
    dialogs.slice(0);

    dialogListViewModel?.dialogs.forEach((entity) => {
      const pw: PreviewDialogViewModel = new PreviewDialogViewModel(
        (it) => {
          if (onDialogSelected) {
            setSelectedItem(it);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onDialogSelected(it);
          }
        },
        (it) => {
          if (onDialogSelected) {
            setSelectedItem(it);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onDialogSelected(it);
          }
        },
        entity,
      );

      if (
        (selectedItem && selectedItem.entity.id === entity.id) ||
        (selectedDialog && selectedDialog.id === entity.id)
      ) {
        pw.isSelected = true;
      }
      dialogs.push(pw);
    });

    setDialogsToView(dialogs);
  }, [dialogListViewModel?.dialogs, selectedDialog]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchMoreData = () => {
    console.log(
      'call fetchMoreData with: pagination: ',
      JSON.stringify(dialogListViewModel?.pagination),
      'View length: ',
      dialogsToView.length,
      'Model length: ',
      dialogListViewModel?.dialogs.length,
    );
    if (
      dialogListViewModel?.dialogs.length === dialogsToView.length &&
      dialogListViewModel?.pagination?.hasNextPage()
    ) {
      const newPagination = dialogListViewModel?.pagination;

      newPagination.perPage = 6;
      newPagination.nextPage(); // curPage + 1

      console.log(
        'call fetchMoreData with: pagination: ',
        JSON.stringify(newPagination),
        'View length: ',
        dialogsToView.length,
        'Model length: ',
        dialogListViewModel?.dialogs.length,
      );
      // eslint-disable-next-line @typescript-eslint/await-thenable
      dialogListViewModel?.getDialogs(newPagination);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useHeader = !additionalSettings?.withoutHeader || header || false;
  const useSubContent =
    additionalSettings?.useSubHeader || subHeaderContent || false;
  const useUpContent =
    additionalSettings?.useUpHeader || upHeaderContent || false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const HeaderContent = header || (
    <Header title="Dialogs" className="dialog-list-header">
      <SearchSvg
        className="dialog-list-header__icons"
        onClick={() => {
          setShowSearchDialogs(!showSearchDialogs);
          setNameDialogForSearch('');
        }}
      />
      <NewChatSvg
        className="dialog-list-header__icons"
        onClick={onCreateDialog}
      />
    </Header>
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderPreviewDialog = (item: PreviewDialogViewModel, index: number) => {
    function getMessageDateTimeSent() {
      let dateInt = 0;
      let formattedValue = '';

      if (item.entity.lastMessage.dateSent) {
        dateInt = parseInt(item.entity.lastMessage.dateSent, 10);
        if (Number.isNaN(dateInt)) {
          return formattedValue;
        }
        formattedValue = getDateForDialog(dateInt * 1000);
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

        AvatarComponent = imagePhoto ? (
          <Avatar size="lg" src={imagePhoto} />
        ) : undefined;
      }

      return AvatarComponent;
    };

    return (
      <div
        key={index}
        onClick={() => {
          setDialogsToView((prevState) => {
            // const newState = [...prevState];

            // if (selectedItem && selectedItem.selectedIndex) {
            //   newState[selectedItem.selectedIndex].isSelected = false;
            // }

            const newState = prevState.map((el) => {
              // eslint-disable-next-line no-param-reassign
              el.isSelected = false;

              return el;
            });

            newState[index].isSelected = true;

            return newState;
          });
        }}
        style={{
          pointerEvents: !dialogListViewModel?.loading ? 'auto' : 'none',
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
          onLeaveDialog={onLeaveDialog}
        />
      </div>
    );
  };

  const renderSearchDialogs = () => {
    return (
      <TextField
        className="search-dialog-text-field"
        disabled={dialogListViewModel?.loading}
        placeholder="Search"
        icon={<SearchSvg className="search-dialog-text-field__icon" />}
        value={nameDialogForSearch}
        onChange={(value) => {
          setNameDialogForSearch(value);
        }}
      />
    );
  };

  const searchedDialogs = nameDialogForSearch
    ? dialogsToView.filter(({ entity }) =>
        entity.name.toUpperCase().includes(nameDialogForSearch.toUpperCase()),
      )
    : dialogsToView;

  const isEmptyDialogList =
    dialogsToView &&
    dialogsToView.length === 0 &&
    nameDialogForSearch.length === 0;

  // todo: use createRef with useEffect
  return (
    <div className="dialog-list">
      <ColumnContainer maxWidth={isMobile ? '100%' : '320px'}>
        {useUpContent && upHeaderContent}
        {useHeader && HeaderContent}
        {useSubContent && subHeaderContent}

        <div
          className={cn({
            'scroll-box': !showSearchDialogs || !(searchedDialogs.length === 0),
          })}
          style={{ maxHeight: 'initial', height: 'initial' }}
          ref={(el) => {
            if (el) {
              el.style.setProperty(
                'max-height',
                `${scrollableHeight}px`,
                'important',
              );
              el.style.setProperty(
                'height',
                `${scrollableHeight}px`,
                'important',
              );
            }
          }}
        >
          {dialogListViewModel?.loading && (
            <div
              className="dialog-list__loader-container"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loader size="md" className="dialog-list__loader" />
            </div>
          )}
          {dialogListViewModel?.error && (
            <ErrorComponent title="Something is wrong." />
          )}
          {showSearchDialogs ? renderSearchDialogs() : null}

          {nameDialogForSearch.length > 0 &&
            searchedDialogs.length > 0 &&
            dialogsToView
              .filter((item) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                item.entity.name
                  .toUpperCase()
                  .includes(nameDialogForSearch.toUpperCase(), 0),
              )
              .map((item, index) => renderPreviewDialog(item, index))}

          {!isEmptyDialogList &&
            nameDialogForSearch.length === 0 &&
            dialogsToView.map((item, index) =>
              renderPreviewDialog(item, index),
            )}

          {(isEmptyDialogList || searchedDialogs.length === 0) &&
            !dialogListViewModel?.loading && (
              <Placeholder
                icon={<ChatSvg />}
                text={
                  !isEmptyDialogList
                    ? 'There are no dialogs.'
                    : ['There are no dialogs.', 'Please, create one.']
                }
                className="dialog-empty-chat-placeholder"
              />
            )}
        </div>
      </ColumnContainer>
    </div>
  );
};

export default DialogList;
