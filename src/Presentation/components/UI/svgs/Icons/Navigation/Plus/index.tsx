import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Plus(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.8334 23.8333H23.8334V34.8333H20.1667V23.8333H9.16675V20.1667H20.1667V9.16666H23.8334V20.1667H34.8334V23.8333Z"
        id="Plus"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Plus;
