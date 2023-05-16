import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function ContactFilled(theme: IconTheme | undefined = undefined) {
  return (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.0001 3.66663C11.8801 3.66663 3.66675 11.88 3.66675 22C3.66675 32.12 11.8801 40.3333 22.0001 40.3333C32.1201 40.3333 40.3334 32.12 40.3334 22C40.3334 11.88 32.1201 3.66663 22.0001 3.66663ZM22.0001 9.16663C25.0434 9.16663 27.5001 11.6233 27.5001 14.6666C27.5001 17.71 25.0434 20.1666 22.0001 20.1666C18.9567 20.1666 16.5001 17.71 16.5001 14.6666C16.5001 11.6233 18.9567 9.16663 22.0001 9.16663ZM22.0001 35.2C17.4167 35.2 13.3651 32.8533 11.0001 29.2966C11.0551 25.6483 18.3334 23.65 22.0001 23.65C25.6484 23.65 32.9451 25.6483 33.0001 29.2966C30.6351 32.8533 26.5834 35.2 22.0001 35.2Z"
        id="ContactFilled"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default ContactFilled;
