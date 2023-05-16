import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function ImageFile(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6666 29.3334H29.3333V33.0001H14.6666V29.3334ZM14.6666 22.0001H29.3333V25.6667H14.6666V22.0001ZM25.6666 3.66675H10.9999C8.98325 3.66675 7.33325 5.31675 7.33325 7.33341V36.6667C7.33325 38.6834 8.96492 40.3334 10.9816 40.3334H32.9999C35.0166 40.3334 36.6666 38.6834 36.6666 36.6667V14.6667L25.6666 3.66675ZM32.9999 36.6667H10.9999V7.33341H23.8333V16.5001H32.9999V36.6667Z"
        id="File"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '24'}
      height={theme && theme.height ? theme.height : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3337 5.33337H8.00033C7.26699 5.33337 6.67366 5.93337 6.67366 6.66671L6.66699 17.3334C6.66699 18.0667 7.26033 18.6667 7.99366 18.6667H16.0003C16.7337 18.6667 17.3337 18.0667 17.3337 17.3334V9.33337L13.3337 5.33337ZM14.667 16H9.33366V14.6667H14.667V16ZM14.667 13.3334H9.33366V12H14.667V13.3334ZM12.667 10V6.33337L16.3337 10H12.667Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default ImageFile;
