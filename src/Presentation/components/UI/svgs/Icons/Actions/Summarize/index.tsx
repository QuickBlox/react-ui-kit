import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function SummarizeIcon(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.667 3.66663H7.33366C5.31699 3.66663 3.66699 5.31663 3.66699 7.33329V40.3333L11.0003 33H36.667C38.6837 33 40.3337 31.35 40.3337 29.3333V7.33329C40.3337 5.31663 38.6837 3.66663 36.667 3.66663ZM36.667 29.3333H11.0003L7.33366 33V7.33329H36.667V29.3333Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
      <path
        d="M12.0002 13C12.0002 12.4477 12.448 12 13.0002 12H22.0002C22.5525 12 23.0002 12.4477 23.0002 13V17C23.0002 17.5523 22.5525 18 22.0002 18H13.0002C12.448 18 12.0002 17.5523 12.0002 17V13Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
      <path
        d="M26.0002 13C26.0002 12.4477 26.448 12 27.0002 12H31.0002C31.5525 12 32.0002 12.4477 32.0002 13V24C32.0002 24.5523 31.5525 25 31.0002 25H27.0002C26.448 25 26.0002 24.5523 26.0002 24V13Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
      <path
        d="M15.0002 21C15.0002 20.4477 15.448 20 16.0002 20H22.0002C22.5525 20 23.0002 20.4477 23.0002 21V23C23.0002 23.5523 22.5525 24 22.0002 24H16.0002C15.448 24 15.0002 23.5523 15.0002 23V21Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '22'}
      height={theme && theme.height ? theme.height : '22'}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.667 3.66663H7.33366C5.31699 3.66663 3.66699 5.31663 3.66699 7.33329V40.3333L11.0003 33H36.667C38.6837 33 40.3337 31.35 40.3337 29.3333V7.33329C40.3337 5.31663 38.6837 3.66663 36.667 3.66663ZM36.667 29.3333H11.0003L7.33366 33V7.33329H36.667V29.3333Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
      <path
        d="M12.0002 13C12.0002 12.4477 12.448 12 13.0002 12H22.0002C22.5525 12 23.0002 12.4477 23.0002 13V17C23.0002 17.5523 22.5525 18 22.0002 18H13.0002C12.448 18 12.0002 17.5523 12.0002 17V13Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
      <path
        d="M26.0002 13C26.0002 12.4477 26.448 12 27.0002 12H31.0002C31.5525 12 32.0002 12.4477 32.0002 13V24C32.0002 24.5523 31.5525 25 31.0002 25H27.0002C26.448 25 26.0002 24.5523 26.0002 24V13Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
      <path
        d="M15.0002 21C15.0002 20.4477 15.448 20 16.0002 20H22.0002C22.5525 20 23.0002 20.4477 23.0002 21V23C23.0002 23.5523 22.5525 24 22.0002 24H16.0002C15.448 24 15.0002 23.5523 15.0002 23V21Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default SummarizeIcon;
