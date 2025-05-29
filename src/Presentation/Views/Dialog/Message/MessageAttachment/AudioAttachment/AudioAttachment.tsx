import React, { useEffect, useRef, useState } from 'react';
import './AudioAttachment.scss';
import { FileEntity } from '../../../../../../Domain/entity/FileEntity';
import ImagePlay from '../../../../../components/UI/svgs/Icons/Toggle/ImagePlay';
import Pause from '../../../../../components/UI/svgs/Icons/Toggle/Pause';

type AudioAttachmentComponentProps = {
  audioFile: FileEntity;
};
// eslint-disable-next-line react/function-component-definition
const AudioAttachment: React.FC<AudioAttachmentComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  audioFile,
}: AudioAttachmentComponentProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  // eslint-disable-next-line consistent-return
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
      uniqueNumbers.push(Math.abs((inputString.charCodeAt(i) % 11) + 2));
    }

    return uniqueNumbers;
  };

  const renderEqualizer = (uid: string) => {
    const divElements: JSX.Element[] = [];

    const nums = generateUniqueNumbers(uid, 30);

    for (let i = 0; i < 30; i += 1) {
      const divStyle = {
        height: `${nums[i]}px`,
      };

      divElements.push(
        <div className="rectangle-equalizer" key={i} style={divStyle} />,
      );
    }

    return divElements;
  };

  const renderRandomEqualizer = () => {
    const divElements: JSX.Element[] = [];

    for (let i = 0; i < 30; i += 1) {
      const randomHeight = Math.floor(Math.random() * 12) + 1;

      const divStyle = {
        height: `${randomHeight}px`,
      };

      divElements.push(
        <div className="rectangle-equalizer" key={i} style={divStyle} />,
      );
    }

    return divElements;
  };

  return (
    <div>
      <audio
        ref={audioRef}
        className="audio-body"
        controls
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src={audioFile.url} type={audioFile?.type?.toString()} />
        <source src={audioFile.url} type="audio/mpeg" />
        <source src={audioFile.url} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div className="audio-controls">
        <div onClick={playPauseHandler}>
          {/* eslint-disable-next-line react/button-has-type */}
          {isPlaying ? (
            <Pause width="24px" height="24px" color="var(--main-elements)" />
          ) : (
            <ImagePlay
              width="24px"
              height="24px"
              color="var(--main-elements)"
            />
          )}
        </div>
        {isPlaying ? (
          <div className="equalizer">{renderRandomEqualizer()}</div>
        ) : (
          <div className="equalizer">{renderEqualizer(audioFile.uid)}</div>
        )}
      </div>
    </div>
  );
};

export default AudioAttachment;
