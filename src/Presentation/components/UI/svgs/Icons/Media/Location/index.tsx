import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Location(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Location"
    >
      <path
        d="M22.0001 3.66675C14.9051 3.66675 9.16675 9.40508 9.16675 16.5001C9.16675 26.1251 22.0001 40.3334 22.0001 40.3334C22.0001 40.3334 34.8334 26.1251 34.8334 16.5001C34.8334 9.40508 29.0951 3.66675 22.0001 3.66675ZM12.8334 16.5001C12.8334 11.4401 16.9401 7.33341 22.0001 7.33341C27.0601 7.33341 31.1667 11.4401 31.1667 16.5001C31.1667 21.7801 25.8867 29.6817 22.0001 34.6134C18.1867 29.7184 12.8334 21.7251 12.8334 16.5001Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
      <path
        d="M22.0001 21.0834C24.5314 21.0834 26.5834 19.0314 26.5834 16.5001C26.5834 13.9688 24.5314 11.9167 22.0001 11.9167C19.4688 11.9167 17.4167 13.9688 17.4167 16.5001C17.4167 19.0314 19.4688 21.0834 22.0001 21.0834Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Location;
