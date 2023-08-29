import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function ToneIcon(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '24'}
      height={theme && theme.height ? theme.height : '24'}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        id="ToneIcon"
        d="M12 3.27273V0L7.63634 4.36364L12 8.72727V5.45455C15.6109 5.45455 18.5454 8.38909 18.5454 12C18.5454 13.1018 18.2727 14.1491 17.7818 15.0545L19.3745 16.6473C20.2254 15.3055 20.7272 13.7127 20.7272 12C20.7272 7.17818 16.8218 3.27273 12 3.27273ZM12 18.5455C8.38907 18.5455 5.45452 15.6109 5.45452 12C5.45452 10.8982 5.72725 9.85091 6.21816 8.94545L4.62543 7.35273C3.77452 8.69455 3.27271 10.2873 3.27271 12C3.27271 16.8218 7.17816 20.7273 12 20.7273V24L16.3636 19.6364L12 15.2727V18.5455Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '24'}
      height={theme && theme.height ? theme.height : '24'}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        id="ToneIcon"
        d="M12 3.27273V0L7.63634 4.36364L12 8.72727V5.45455C15.6109 5.45455 18.5454 8.38909 18.5454 12C18.5454 13.1018 18.2727 14.1491 17.7818 15.0545L19.3745 16.6473C20.2254 15.3055 20.7272 13.7127 20.7272 12C20.7272 7.17818 16.8218 3.27273 12 3.27273ZM12 18.5455C8.38907 18.5455 5.45452 15.6109 5.45452 12C5.45452 10.8982 5.72725 9.85091 6.21816 8.94545L4.62543 7.35273C3.77452 8.69455 3.27271 10.2873 3.27271 12C3.27271 16.8218 7.17816 20.7273 12 20.7273V24L16.3636 19.6364L12 15.2727V18.5455Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default ToneIcon;
