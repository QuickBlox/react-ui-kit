import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Back(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.6668 20.1667H14.3552L24.6035 9.91834L22.0002 7.33334L7.3335 22L22.0002 36.6667L24.5852 34.0817L14.3552 23.8333H36.6668V20.1667Z"
        id="Back"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Back;
