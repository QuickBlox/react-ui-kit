import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Share(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.0002 27.5V33H11.0002V27.5H7.3335V33C7.3335 35.0166 8.9835 36.6666 11.0002 36.6666H33.0002C35.0168 36.6666 36.6668 35.0166 36.6668 33V27.5H33.0002ZM12.8335 16.5L15.4185 19.085L20.1668 14.355V29.3333H23.8335V14.355L28.5818 19.085L31.1668 16.5L22.0002 7.33331L12.8335 16.5Z"
        id="Share"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Share;
