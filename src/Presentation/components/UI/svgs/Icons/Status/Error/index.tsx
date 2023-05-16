import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Error(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9999 11.8983L35.8049 35.7499H8.19492L21.9999 11.8983ZM21.9999 4.58325L1.83325 39.4166H42.1666L21.9999 4.58325ZM23.8333 30.2499H20.1666V33.9166H23.8333V30.2499ZM23.8333 19.2499H20.1666V26.5833H23.8333V19.2499Z"
        id="Error"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9999 11.8983L35.8049 35.7499H8.19492L21.9999 11.8983ZM21.9999 4.58325L1.83325 39.4166H42.1666L21.9999 4.58325ZM23.8333 30.2499H20.1666V33.9166H23.8333V30.2499ZM23.8333 19.2499H20.1666V26.5833H23.8333V19.2499Z"
        id="Error"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Error;
