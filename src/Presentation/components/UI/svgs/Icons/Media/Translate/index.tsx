import React from 'react';
import { IconTheme } from '../../IconsCommonTypes';

function TranslateIcon(theme: IconTheme | undefined = undefined) {
  return !theme?.applyZoom ? (
    <svg
      width={theme && theme.width ? theme.width : '16'}
      height={theme && theme.height ? theme.height : '16'}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        id="TranslateIcon"
        d="M9.36002 10.9596L7.51275 9.1341L7.53457 9.11228C8.80002 7.70137 9.70184 6.07956 10.2327 4.36319H12.3637V2.90865H7.27275V1.4541H5.8182V2.90865H0.727295V4.35592H8.85093C8.36366 5.75956 7.59275 7.09047 6.54548 8.2541C5.86911 7.50501 5.30911 6.68319 4.86548 5.81774H3.41093C3.94184 7.00319 4.66911 8.12319 5.5782 9.1341L1.87639 12.785L2.90911 13.8177L6.54548 10.1814L8.80729 12.4432L9.36002 10.9596ZM13.4546 7.27228H12L8.72729 15.9996H10.1818L10.9964 13.8177H14.4509L15.2727 15.9996H16.7273L13.4546 7.27228ZM11.5491 12.3632L12.7273 9.2141L13.9055 12.3632H11.5491Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  ) : (
    <svg
      width={theme && theme.width ? theme.width : '17'}
      height={theme && theme.height ? theme.height : '16'}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="TranslateIcon"
        d="M9.36002 10.9596L7.51275 9.1341L7.53457 9.11228C8.80002 7.70137 9.70184 6.07956 10.2327 4.36319H12.3637V2.90865H7.27275V1.4541H5.8182V2.90865H0.727295V4.35592H8.85093C8.36366 5.75956 7.59275 7.09047 6.54548 8.2541C5.86911 7.50501 5.30911 6.68319 4.86548 5.81774H3.41093C3.94184 7.00319 4.66911 8.12319 5.5782 9.1341L1.87639 12.785L2.90911 13.8177L6.54548 10.1814L8.80729 12.4432L9.36002 10.9596ZM13.4546 7.27228H12L8.72729 15.9996H10.1818L10.9964 13.8177H14.4509L15.2727 15.9996H16.7273L13.4546 7.27228ZM11.5491 12.3632L12.7273 9.2141L13.9055 12.3632H11.5491Z"
        fill={theme && theme.color ? theme.color : 'var(--color-icon)'}
      />
    </svg>
  );
}

export default TranslateIcon;
