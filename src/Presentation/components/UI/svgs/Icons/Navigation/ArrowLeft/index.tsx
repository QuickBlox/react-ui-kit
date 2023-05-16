import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function ArrowLeft(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5001 34.8334L19.0851 32.2484L10.6884 23.8334H40.3334V20.1667H10.6884L19.1034 11.7517L16.5001 9.16669L3.66675 22L16.5001 34.8334Z"
        id="ArrowLeft"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default ArrowLeft;
