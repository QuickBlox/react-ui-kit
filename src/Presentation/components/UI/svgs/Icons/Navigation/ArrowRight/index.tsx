import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function ArrowRight(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5001 9.16669L25.9151 11.7517L34.3117 20.1667H4.66675V23.8334H34.3117L25.8967 32.2484L28.5001 34.8334L41.3334 22L28.5001 9.16669Z"
        id="ArrowRight"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default ArrowRight;
