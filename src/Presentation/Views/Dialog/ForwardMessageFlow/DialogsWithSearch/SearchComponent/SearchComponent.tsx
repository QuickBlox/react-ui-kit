import React, { useEffect, useState } from 'react';
import './SearchComponent.scss';
import Search from '../../../../../components/UI/svgs/Icons/Navigation/Search';
import { FunctionTypeStringToVoid } from '../../../../../../CommonTypes/BaseViewModel';
import Remove from '../../../../../components/UI/svgs/Icons/Actions/Remove';

type SearchComponentProps = {
  onChange: FunctionTypeStringToVoid;
};

// eslint-disable-next-line react/function-component-definition
const SearchComponent = ({
  onChange,
}: SearchComponentProps) => {
  const [stringForFilter, setStringForFilter] = useState('');

  useEffect(() => {
    onChange(stringForFilter);
  }, [stringForFilter]);

  return (
    <div className="search-component">
      <div className="search-component-field">
        <div className="search-component-field-left">
          <div className="search-component-field-left-icon">
            <Search
              applyZoom
              width="24"
              height="24"
              color="var(--tertiary-elements)"
            />
          </div>
          <div className="search-component-field-left-input">
            <input
              type="text"
              style={{ width: '280px' }}
              value={stringForFilter}
              onChange={(event) => {
                setStringForFilter(event.target.value);
              }}
              placeholder="Search"
            />
            {stringForFilter.length > 0 ? (
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setStringForFilter('');
                }}
              >
                <Remove
                  width="24"
                  height="24"
                  color="var(--tertiary-elements)"
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="search-component-field-right" />
      </div>
    </div>
  );
};

export default SearchComponent;
