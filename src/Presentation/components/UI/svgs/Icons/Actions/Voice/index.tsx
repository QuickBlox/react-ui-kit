import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function VoiceIcon(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.0001 26.5834C25.0434 26.5834 27.5001 24.1267 27.5001 21.0834V10.0834C27.5001 7.04004 25.0434 4.58337 22.0001 4.58337C18.9567 4.58337 16.5001 7.04004 16.5001 10.0834V21.0834C16.5001 24.1267 18.9567 26.5834 22.0001 26.5834ZM20.1667 10.0834C20.1667 9.07504 20.9917 8.25004 22.0001 8.25004C23.0084 8.25004 23.8334 9.07504 23.8334 10.0834V21.0834C23.8334 22.0917 23.0084 22.9167 22.0001 22.9167C20.9917 22.9167 20.1667 22.0917 20.1667 21.0834V10.0834ZM31.1667 21.0834C31.1667 26.1434 27.0601 30.25 22.0001 30.25C16.9401 30.25 12.8334 26.1434 12.8334 21.0834H9.16675C9.16675 27.555 13.9517 32.8717 20.1667 33.77V39.4167H23.8334V33.77C30.0484 32.8717 34.8334 27.555 34.8334 21.0834H31.1667Z"
        id="Voice"
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
        d="M12 14.5C13.66 14.5 15 13.16 15 11.5V5.5C15 3.84 13.66 2.5 12 2.5C10.34 2.5 9 3.84 9 5.5V11.5C9 13.16 10.34 14.5 12 14.5ZM11 5.5C11 4.95 11.45 4.5 12 4.5C12.55 4.5 13 4.95 13 5.5V11.5C13 12.05 12.55 12.5 12 12.5C11.45 12.5 11 12.05 11 11.5V5.5ZM17 11.5C17 14.26 14.76 16.5 12 16.5C9.24 16.5 7 14.26 7 11.5H5C5 15.03 7.61 17.93 11 18.42V21.5H13V18.42C16.39 17.93 19 15.03 19 11.5H17Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default VoiceIcon;
