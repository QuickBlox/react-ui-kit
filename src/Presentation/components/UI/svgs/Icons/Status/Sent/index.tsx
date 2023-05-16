import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function SentStatusIcon(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1334 29.1499L8.43337 21.4499L5.8667 24.0166L16.1334 34.2832L38.1334 12.2832L35.5667 9.71655L16.1334 29.1499Z"
        id="Sent"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default SentStatusIcon;
