import React, { useEffect, useState } from 'react';
import './DialogsWithSearch.scss';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
// eslint-disable-next-line import/named
import { FunctionTypeStringToVoid } from '../../../../../CommonTypes/BaseViewModel';
import SearchComponent from './SearchComponent/SearchComponent';
import DialogListItem from './DialogListItem/DialogListItem';
import ScrollableContainer from '../../../../components/containers/ScrollableContainer/ScrollableContainer';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import { PublicDialogEntity } from '../../../../../Domain/entity/PublicDialogEntity';

type DialogsWithSearchProps = {
  dialogs: DialogEntity[];
  currentDialog: DialogEntity;
  selectedDialogs: string[];
  onSelect: FunctionTypeStringToVoid;
};

// eslint-disable-next-line react/function-component-definition
const DialogsWithSearch: React.FC<DialogsWithSearchProps> = ({
  dialogs,
  currentDialog,
  selectedDialogs,
  onSelect,
}: DialogsWithSearchProps) => {
  const [stringForFilter, setStringForFilter] = useState('');
  const [filteredDialogs, setFilteredDialogs] = useState([
    ...dialogs.filter((u) => u.id !== currentDialog.id),
  ]);

  function filterDialogsByName(
    filter: string,
    idCurrentDialogs: string,
  ): DialogEntity[] {
    if (filter.length >= 3) {
      const newFilteredData = dialogs.filter((item) =>
        item.name
          ? item.name.toUpperCase().includes(filter.toUpperCase(), 0) &&
            item.id !== idCurrentDialogs
          : false,
      );

      return [...newFilteredData];
    }

    return [...dialogs.filter((u) => u.id !== currentDialog.id)];
  }

  useEffect(() => {
    setFilteredDialogs(filterDialogsByName(stringForFilter, currentDialog.id));
  }, [stringForFilter]);
  const renderItem = (item: DialogEntity) => {
    return (
      <div className="dialogs-with-search-list-item" key={item.id}>
        <DialogListItem
          name={item.name}
          id={item.id}
          avatar={
            item.type === DialogType.group
              ? (item as PublicDialogEntity).photo
              : ''
          }
          typeDialog={item.type}
          checked={selectedDialogs.includes(item.id)}
          onSelect={() => onSelect(item.id)}
        />
        <svg
          className="dialogs-with-search-list-divider"
          width="332"
          height="0"
        />
      </div>
    );
  };

  /* eslint-disable-next-line react/jsx-no-bind */
  return (
    <div className="dialogs-with-search-body">
      <SearchComponent
        onChange={(str) => {
          setStringForFilter(str);
        }}
      />

      {/* <div className="dialogs-with-search-list"> */}
      <ScrollableContainer
        className="dialogs-with-search-list"
        data={filteredDialogs}
        renderItem={renderItem}
        onEndReachedThreshold={0.8}
        refreshing={false}
      />
      {/* </div> */}
    </div>
  );
};

export default DialogsWithSearch;
