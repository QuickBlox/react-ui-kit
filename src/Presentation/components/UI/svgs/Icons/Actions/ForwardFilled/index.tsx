import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function ForwardFilled(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.1667 13.75V8.25L44 21.0833L31.1667 33.9167V28.4167L38.5 21.0833L31.1667 13.75ZM20.1667 15.5833V8.25L33 21.0833L20.1667 33.9167V26.4C11 26.4 4.58333 29.3333 0 35.75C1.83333 26.5833 7.33333 17.4167 20.1667 15.5833Z"
        id="ForwardFilled"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default ForwardFilled;
