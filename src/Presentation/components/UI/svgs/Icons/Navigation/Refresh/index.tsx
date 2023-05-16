import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Refresh(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.3492 11.6416C29.6909 8.98331 26.0425 7.33331 21.9909 7.33331C13.8875 7.33331 7.34253 13.8966 7.34253 22C7.34253 30.1033 13.8875 36.6666 21.9909 36.6666C28.8292 36.6666 34.5309 31.9916 36.1625 25.6666H32.3492C30.8459 29.9383 26.7759 33 21.9909 33C15.9225 33 10.9909 28.0683 10.9909 22C10.9909 15.9316 15.9225 11 21.9909 11C25.0342 11 27.7475 12.265 29.7275 14.2633L23.8242 20.1666H36.6575V7.33331L32.3492 11.6416Z"
        id="Refresh"
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
        d="M17.6449 6.35C16.1949 4.9 14.2049 4 11.9949 4C7.57488 4 4.00488 7.58 4.00488 12C4.00488 16.42 7.57488 20 11.9949 20C15.7249 20 18.8349 17.45 19.7249 14H17.6449C16.8249 16.33 14.6049 18 11.9949 18C8.68488 18 5.99488 15.31 5.99488 12C5.99488 8.69 8.68488 6 11.9949 6C13.6549 6 15.1349 6.69 16.2149 7.78L12.9949 11H19.9949V4L17.6449 6.35Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}
// "#3978FC"

export default Refresh;
