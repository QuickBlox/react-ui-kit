import React from 'react';
import './MessageSeparator.scss';

type MessageSeparatorProps = {
  text: string;
  type?: 'date' | 'system';
};
const parseDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const currentDate = new Date();

  const weekday = date.toLocaleString('default', { weekday: 'short' });

  if (currentDate.toDateString() === date.toDateString()) {
    return `Today, ${weekday}`;
  }
  if (currentDate.getDate() - date.getDate() === 1) {
    return `Yesterday, ${weekday}`;
  }
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  return `${month} ${day}, ${weekday}`;
};

export default function MessageSeparator({
  text,
  type = 'date',
}: MessageSeparatorProps) {
  return type === 'date' ? (
    <div className="system-date-banner-chat-banner">{parseDate(text)}</div>
  ) : (
    <div className="system-message-chat-banner">{text}</div>
  );
}
