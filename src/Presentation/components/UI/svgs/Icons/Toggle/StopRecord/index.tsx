import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function StopRecord(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 11H33V33H11V11Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
        id="StopRecord"
      />
    </svg>
  );
}

export default StopRecord;
