import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function ImagePlay(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9165 9.16675V34.8334L33.0832 22.0001L12.9165 9.16675Z"
        id="Play"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default ImagePlay;
