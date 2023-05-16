import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function InformationFill(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="32"
        height="32"
        rx="4"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
      <path
        d="M15 19H17V21H15V19ZM15 11H17V17H15V11ZM15.99 6C10.47 6 6 10.48 6 16C6 21.52 10.47 26 15.99 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 15.99 6ZM16 24C11.58 24 8 20.42 8 16C8 11.58 11.58 8 16 8C20.42 8 24 11.58 24 16C24 20.42 20.42 24 16 24Z"
        fill="#3978FC"
      />
    </svg>
  );
}

export default InformationFill;
/*

<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="4" fill="#C4D7FE"/>
<path d="M15 19H17V21H15V19ZM15 11H17V17H15V11ZM15.99 6C10.47 6 6 10.48 6 16C6 21.52 10.47 26 15.99 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 15.99 6ZM16 24C11.58 24 8 20.42 8 16C8 11.58 11.58 8 16 8C20.42 8 24 11.58 24 16C24 20.42 20.42 24 16 24Z" fill="#3978FC"/>
</svg>

 */
