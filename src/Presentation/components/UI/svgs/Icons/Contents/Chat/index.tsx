import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function Chat(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.6667 3.66663H7.33341C5.31675 3.66663 3.66675 5.31663 3.66675 7.33329V40.3333L11.0001 33H36.6667C38.6834 33 40.3334 31.35 40.3334 29.3333V7.33329C40.3334 5.31663 38.6834 3.66663 36.6667 3.66663ZM36.6667 29.3333H11.0001L7.33341 33V7.33329H36.6667V29.3333Z"
        id="Chat"
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
        d="M20 2H4.00005C2.90005 2 2.00005 2.9 2.00005 4V22L6.00005 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6.00005L4.00005 18V4H20V16Z"
        fill="var(--color-icon)"
      />
    </svg>
  );
}

export default Chat;
