import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function SendIcon(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '44'}
      height={theme && theme.height ? theme.height : '44'}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.76833 38.5L41.25 22L2.76833 5.5L2.75 18.3333L30.25 22L2.75 25.6667L2.76833 38.5Z"
        id="SendB"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '22'}
      height={theme && theme.height ? theme.height : '18'}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.51 18L21.5 9L0.51 0L0.5 7L15.5 9L0.5 11L0.51 18Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}
/*


 */
export default SendIcon;
