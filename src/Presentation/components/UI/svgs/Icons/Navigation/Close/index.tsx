import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Close(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.8332 11.7517L33.2482 9.16666L22.9998 19.415L12.7515 9.16666L10.1665 11.7517L20.4148 22L10.1665 32.2483L12.7515 34.8333L22.9998 24.585L33.2482 34.8333L35.8332 32.2483L25.5848 22L35.8332 11.7517Z"
        id="Close"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '32'}
      height={theme && theme.height ? theme.height : '32'}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5454 10.41L22.1354 9L16.5454 14.59L10.9554 9L9.54541 10.41L15.1354 16L9.54541 21.59L10.9554 23L16.5454 17.41L22.1354 23L23.5454 21.59L17.9554 16L23.5454 10.41Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default Close;
