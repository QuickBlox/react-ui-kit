import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function More(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9999 14.6667C24.0166 14.6667 25.6666 13.0167 25.6666 11C25.6666 8.98334 24.0166 7.33334 21.9999 7.33334C19.9833 7.33334 18.3333 8.98334 18.3333 11C18.3333 13.0167 19.9833 14.6667 21.9999 14.6667ZM21.9999 18.3333C19.9833 18.3333 18.3333 19.9833 18.3333 22C18.3333 24.0167 19.9833 25.6667 21.9999 25.6667C24.0166 25.6667 25.6666 24.0167 25.6666 22C25.6666 19.9833 24.0166 18.3333 21.9999 18.3333ZM21.9999 29.3333C19.9833 29.3333 18.3333 30.9833 18.3333 33C18.3333 35.0167 19.9833 36.6667 21.9999 36.6667C24.0166 36.6667 25.6666 35.0167 25.6666 33C25.6666 30.9833 24.0166 29.3333 21.9999 29.3333Z"
        id="More"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default More;
