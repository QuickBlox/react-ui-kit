import React from 'react';
import { ReactComponent as StatusSentSvg } from '../../../icons/status/sent.svg';
import { ReactComponent as StatusViewedDeliveredSvg } from '../../../icons/status/viewed-delivered.svg';
import { ReactComponent as StatusErrorSvg } from '../../../icons/status/error.svg';
import './TimeAndStatus.scss';

const statusIconDictionary = {
  sent: StatusSentSvg,
  delivered: StatusViewedDeliveredSvg,
  viewed: StatusViewedDeliveredSvg,
  error: StatusErrorSvg,
};

interface TimeAndStatusProps {
  status?: 'sent' | 'delivered' | 'viewed' | 'error';
  time: string;
}

export default function TimeAndStatus({ status, time }: TimeAndStatusProps) {
  const StatusIcon = statusIconDictionary[status!];

  return (
    <div className="time-status__caption">
      {status && (
        <div className="time-status__caption__status">
          <StatusIcon className={`status-message--${status}`} />
        </div>
      )}
      <div className="time-status__time">{time}</div>
    </div>
  );
}
