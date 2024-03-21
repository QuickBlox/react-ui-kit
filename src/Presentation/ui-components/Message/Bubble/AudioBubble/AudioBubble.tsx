import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as PlaySvg } from '../../../../icons/toggle/play.svg';
import { ReactComponent as PauseSvg } from '../../../../icons/toggle/pause.svg';

import './AudioBubble.scss';

interface AudioBubbleProps {
  type: 'outgoing' | 'incoming';
  title?: string;
  href?: string;
  fileUid?: string;
  audioFileType?: string;
}

export default function AudioBubble({
  type,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  href,
  fileUid,
  audioFileType,
}: AudioBubbleProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setSecondsElapsed(0);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,consistent-return
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener('ended', handleAudioEnd);

      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setSecondsElapsed((prevSeconds) => prevSeconds + 1);
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  const playPauseHandler = () => {
    const audio = audioRef.current as HTMLAudioElement;

    if (audio) {
      if (isPlaying) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        audio.pause();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        audio.play();
      }

      setIsPlaying(!isPlaying);
    } else {
      console.error('Audio element not found');
    }
  };

  const generateUniqueNumbers = (
    inputString: string,
    count: number,
  ): number[] => {
    const uniqueNumbers: number[] = [];

    for (let i = 0; i < count; i += 1) {
      uniqueNumbers.push(Math.abs(inputString.charCodeAt(i) % 11) + 2);
    }

    return uniqueNumbers;
  };

  const renderRandomEqualizer = () => {
    const divElements: JSX.Element[] = [];

    for (let i = 0; i < 30; i += 1) {
      const randomHeight = Math.floor(Math.random() * 12) + 1;

      const divStyle = {
        height: `${randomHeight}px`,
      };

      divElements.push(
        <div className="equalizer__rectangle" key={i} style={divStyle} />,
      );
    }

    return divElements;
  };

  const renderEqualizer = (uid: string) => {
    const divElements: JSX.Element[] = [];

    const nums = generateUniqueNumbers(uid, 30);

    for (let i = 0; i < 30; i += 1) {
      const divStyle = {
        height: `${nums[i]}px`,
      };

      divElements.push(
        <div className="equalizer__rectangle" key={i} style={divStyle} />,
      );
    }

    return divElements;
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className={`audio-bubble-background__${type}`}>
      <audio ref={audioRef} className="audio-body" preload="auto">
        <source src={href} type={audioFileType} />
        <source src={href} type="audio/mpeg" />
        <source src={href} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div className="audio-player">
        <div className="audio-body__controls" onClick={playPauseHandler}>
          {isPlaying ? (
            <PauseSvg className="audio-body__controls--color" />
          ) : (
            <PlaySvg className="audio-body__controls--color" />
          )}
        </div>
        <div className="audio-player__equalizer-time">
          <div className="equalizer">
            {isPlaying ? renderRandomEqualizer() : renderEqualizer(fileUid!)}
          </div>
          <div className="time-play">{formatTime(secondsElapsed)}</div>
        </div>
      </div>
    </div>
  );
}
