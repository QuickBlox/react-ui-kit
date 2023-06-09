import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Search(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.8842 26.1342H27.4359L26.9225 25.6392C28.7192 23.5492 29.8009 20.8358 29.8009 17.8842C29.8009 11.3025 24.4659 5.9675 17.8842 5.9675C11.3025 5.9675 5.96753 11.3025 5.96753 17.8842C5.96753 24.4658 11.3025 29.8008 17.8842 29.8008C20.8359 29.8008 23.5492 28.7192 25.6392 26.9225L26.1342 27.4358V28.8842L35.3009 38.0325L38.0325 35.3008L28.8842 26.1342ZM17.8842 26.1342C13.3192 26.1342 9.6342 22.4492 9.6342 17.8842C9.6342 13.3192 13.3192 9.63417 17.8842 9.63417C22.4492 9.63417 26.1342 13.3192 26.1342 17.8842C26.1342 22.4492 22.4492 26.1342 17.8842 26.1342Z"
        id="Search"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '24'}
      height={theme && theme.height ? theme.height : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7551 14.2549H14.9651L14.6851 13.9849C15.6651 12.8449 16.2551 11.3649 16.2551 9.75488C16.2551 6.16488 13.3451 3.25488 9.75513 3.25488C6.16513 3.25488 3.25513 6.16488 3.25513 9.75488C3.25513 13.3449 6.16513 16.2549 9.75513 16.2549C11.3651 16.2549 12.8451 15.6649 13.9851 14.6849L14.2551 14.9649V15.7549L19.2551 20.7449L20.7451 19.2549L15.7551 14.2549ZM9.75513 14.2549C7.26513 14.2549 5.25513 12.2449 5.25513 9.75488C5.25513 7.26488 7.26513 5.25488 9.75513 5.25488C12.2451 5.25488 14.2551 7.26488 14.2551 9.75488C14.2551 12.2449 12.2451 14.2549 9.75513 14.2549Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Search;
