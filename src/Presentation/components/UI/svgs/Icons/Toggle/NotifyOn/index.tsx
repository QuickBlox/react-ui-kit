import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function NotifyOn(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8967 7.02167L11.275 4.4C6.87501 7.755 3.97835 12.925 3.72168 18.7917H7.38835C7.66335 13.9333 10.1567 9.68 13.8967 7.02167ZM36.6117 18.7917H40.2783C40.0033 12.925 37.1067 7.755 32.725 4.4L30.1217 7.02167C33.825 9.68 36.3367 13.9333 36.6117 18.7917ZM33 19.7083C33 14.08 29.9933 9.36833 24.75 8.12167V6.875C24.75 5.35333 23.5217 4.125 22 4.125C20.4783 4.125 19.25 5.35333 19.25 6.875V8.12167C13.9883 9.36833 11 14.0617 11 19.7083V28.875L7.33335 32.5417V34.375H36.6667V32.5417L33 28.875V19.7083ZM22 39.875C22.2567 39.875 22.495 39.8567 22.7333 39.8017C23.925 39.545 24.8967 38.7383 25.3733 37.6383C25.5567 37.1983 25.6483 36.7217 25.6483 36.2083H18.315C18.3333 38.225 19.965 39.875 22 39.875Z"
        id="NotifyOn"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '244'}
      height={theme && theme.height ? theme.height : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.75C13.1 21.75 14 20.85 14 19.75H10C10 20.85 10.9 21.75 12 21.75ZM18 15.75V10.75C18 7.68 16.37 5.11 13.5 4.43V3.75C13.5 2.92 12.83 2.25 12 2.25C11.17 2.25 10.5 2.92 10.5 3.75V4.43C7.64 5.11 6 7.67 6 10.75V15.75L4 17.75V18.75H20V17.75L18 15.75ZM16 16.75H8V10.75C8 8.27 9.51 6.25 12 6.25C14.49 6.25 16 8.27 16 10.75V16.75Z"
        fill="var(--color-icon)"
      />
    </svg>
  );
}

export default NotifyOn;
