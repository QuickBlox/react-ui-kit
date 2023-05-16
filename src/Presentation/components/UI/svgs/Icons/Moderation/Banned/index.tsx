import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Banned(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.0001 3.66675C11.8801 3.66675 3.66675 11.8801 3.66675 22.0001C3.66675 32.1201 11.8801 40.3334 22.0001 40.3334C32.1201 40.3334 40.3334 32.1201 40.3334 22.0001C40.3334 11.8801 32.1201 3.66675 22.0001 3.66675ZM22.0001 36.6667C13.8967 36.6667 7.33341 30.1034 7.33341 22.0001C7.33341 18.6084 8.48841 15.4917 10.4317 13.0167L30.9834 33.5684C28.5084 35.5117 25.3917 36.6667 22.0001 36.6667ZM33.5684 30.9834L13.0167 10.4317C15.4917 8.48841 18.6084 7.33341 22.0001 7.33341C30.1034 7.33341 36.6667 13.8967 36.6667 22.0001C36.6667 25.3917 35.5117 28.5084 33.5684 30.9834Z"
        id="Banned"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Banned;
