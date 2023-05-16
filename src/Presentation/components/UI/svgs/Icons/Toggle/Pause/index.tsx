import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Pause(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 34.8334H18.3333V9.16675H11V34.8334ZM25.6667 9.16675V34.8334H33V9.16675H25.6667Z"
        id="Pause"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Pause;
