import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Down(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.415 16.2075L22 24.6042L13.585 16.2075L11 18.7925L22 29.7925L33 18.7925L30.415 16.2075Z"
        id="Down"
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
        d="M16.59 8.84058L12 13.4206L7.41 8.84058L6 10.2506L12 16.2506L18 10.2506L16.59 8.84058Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Down;
