import React, { useEffect, useState } from 'react';
import './VoiceRecordingProgress.scss';
import { FunctionTypeVoidToVoid } from '../../../../../Views/Base/BaseViewModel';

type VoiceRecordingProgressProps = {
  startStatus: boolean;
  longRecInSec: number;
  ClickActionHandler?: FunctionTypeVoidToVoid;
  TouchActionHandler?: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition
const VoiceRecordingProgress: React.FC<VoiceRecordingProgressProps> = ({
  startStatus,
  longRecInSec,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ClickActionHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TouchActionHandler,
}: VoiceRecordingProgressProps) => {
  let timerId: NodeJS.Timer | undefined;
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [timeString, setTimeString] = useState('00:00:00');
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const valueToCalc = Math.round((currentTime - (startTime || 0)) / 1000);
    const sec = valueToCalc % 60;
    const min = Math.round(valueToCalc / 60);

    const secStr = sec <= 9 ? `0${sec.toString()}` : sec;
    const minStr = min <= 9 ? `0${min.toString()}` : min;
    const strValue = `00:${minStr}:${secStr}`;

    setTimeString(strValue);
  }, [currentTime]);

  const stopTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = undefined;
    }
    if (ClickActionHandler) ClickActionHandler();
    if (TouchActionHandler) TouchActionHandler();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startTimer = () => {
    console.log('call startTimer');
    // setStartTime(Date.now());
    const longRec = longRecInSec <= 60 && longRecInSec > 0 ? longRecInSec : 10;

    console.log(
      'LONG REC IN SEC = ',
      longRecInSec,
      ' using LONG REC = ',
      longRec,
    );
    setTimeout(() => {
      stopTimer();
    }, longRec * 1000);

    if (timerId === undefined) {
      timerId = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    }
  };

  useEffect(() => {
    if (startStatus) startTimer();
  }, [startStatus]);

  return (
    <div className="chat-message-text-container">
      <div
        onClick={() => {
          stopTimer();
        }}
        onTouchStart={() => {
          stopTimer();
        }}
        className="chat-message-text-container__stop_record_button"
      />
      <div>{timeString}</div>
    </div>
  );
};

export default VoiceRecordingProgress;
