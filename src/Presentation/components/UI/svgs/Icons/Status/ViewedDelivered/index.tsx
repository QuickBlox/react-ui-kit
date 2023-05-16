import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function ViewedDelivered(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.9358 12.2925L30.3508 9.70752L18.7275 21.3309L21.3125 23.9159L32.9358 12.2925ZM40.7092 9.70752L21.3125 29.1042L13.6492 21.4592L11.0642 24.0442L21.3125 34.2925L43.3125 12.2925L40.7092 9.70752ZM0.6875 24.0442L10.9358 34.2925L13.5208 31.7075L3.29083 21.4592L0.6875 24.0442Z"
        id="ViewedDelivered"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.73104 4.13191L8.96729 3.36816L5.53313 6.80233L6.29688 7.56608L9.73104 4.13191ZM12.0277 3.36816L6.29688 9.099L4.03271 6.84025L3.26896 7.604L6.29688 10.6319L12.7969 4.13191L12.0277 3.36816ZM0.203125 7.604L3.23104 10.6319L3.99479 9.86816L0.972292 6.84025L0.203125 7.604Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}
/*


*/
export default ViewedDelivered;
