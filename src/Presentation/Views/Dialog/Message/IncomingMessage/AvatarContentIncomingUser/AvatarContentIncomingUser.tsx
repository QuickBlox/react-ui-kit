import React from 'react';
import './AvatarContentIncomingUser.scss';

export interface AvatarContentIncomingUserProps {
  // eslint-disable-next-line react/no-unused-prop-types
  userId: number;
}

export default function AvatarContentIncomingUser() {
  // props: AvatarContentIncomingUserProps,
  return (
    <div className="avatar-wrap">
      <div className="avatar">
        <div className="rectangle" />
        <div className="ellipse" />
        <svg
          className="contents-user"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9999 6.11828C13.1185 6.11828 14.0249 7.0247 14.0249 8.14328C14.0249 9.26185 13.1185 10.1683 11.9999 10.1683C10.8814 10.1683 9.97493 9.26185 9.97493 8.14328C9.97493 7.0247 10.8814 6.11828 11.9999 6.11828ZM11.9999 14.7968C14.8639 14.7968 17.8821 16.2047 17.8821 16.8218V17.8826H6.11779V16.8218C6.11779 16.2047 9.136 14.7968 11.9999 14.7968ZM11.9999 4.28613C9.86886 4.28613 8.14279 6.0122 8.14279 8.14328C8.14279 10.2743 9.86886 12.0004 11.9999 12.0004C14.131 12.0004 15.8571 10.2743 15.8571 8.14328C15.8571 6.0122 14.131 4.28613 11.9999 4.28613ZM11.9999 12.9647C9.42529 12.9647 4.28564 14.2568 4.28564 16.8218V19.7147H19.7142V16.8218C19.7142 14.2568 14.5746 12.9647 11.9999 12.9647Z"
            fill="#636D78"
          />
        </svg>
      </div>
    </div>
  );
}
