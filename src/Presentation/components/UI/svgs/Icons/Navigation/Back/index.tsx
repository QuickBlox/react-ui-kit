import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Back(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '24'}
      height={theme && theme.height ? theme.height : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
    // <svg
    //   width={theme && theme.width ? theme.width : '24'}
    //   height={theme && theme.height ? theme.height : '24'}
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M36.6668 20.1667H14.3552L24.6035 9.91834L22.0002 7.33334L7.3335 22L22.0002 36.6667L24.5852 34.0817L14.3552 23.8333H36.6668V20.1667Z"
    //     id="Back"
    //     fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
    //   />
    // </svg>
  );
}

export default Back;
