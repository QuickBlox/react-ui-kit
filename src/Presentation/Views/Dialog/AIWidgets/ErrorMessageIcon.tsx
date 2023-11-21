import React, { useState, CSSProperties } from 'react';

type ErrorDescription = {
  title: string;
  action: () => void;
};

type ErrorMessageIconProps = {
  errorMessageText: string;
  errorsDescriptions?: ErrorDescription[];
};

const errorMessageIconStyles: { [key: string]: CSSProperties } = {
  errorIcon: {
    display: 'inline-block',
    position: 'relative',
    width: '21px', // Уменьшен размер круга
    height: '21px', // Уменьшен размер круга
    cursor: 'pointer',
  },
  circle: {
    width: '21px', // Уменьшен размер круга
    height: '21px', // Уменьшен размер круга
    backgroundColor: 'red',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exclamationMark: {
    color: 'white',
    fontSize: '12px', // Уменьшен размер восклицательного знака
  },
  errorMessage: {
    position: 'absolute',
    bottom: '100%', // Изменено выравнивание, чтобы текст был выше
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'lightgray',
    border: '1px solid gray',
    padding: '6px',
    borderRadius: '8px',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    zIndex: 1, // Установлен zIndex, чтобы текст был выше других элементов
  },
};

function ErrorMessageIcon({
  errorMessageText,
  errorsDescriptions,
}: ErrorMessageIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        ...errorMessageIconStyles.errorIcon,
        ...(isHovered ? { backgroundColor: 'yellow' } : {}),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={errorMessageIconStyles.circle}>
        <span style={errorMessageIconStyles.exclamationMark}>!</span>
      </div>
      {isHovered && (
        <div style={errorMessageIconStyles.errorMessage}>
          {errorMessageText}
          {errorsDescriptions?.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                item.action();
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ErrorMessageIcon;
