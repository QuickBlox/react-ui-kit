import React, { useState } from 'react';

type MenuItem = {
  title: string;
  icon?: JSX.Element;
  action: () => void;
};

type SliderMenuProps = {
  items: MenuItem[];
  width: number;
  arrowColor?: string;
  activeArrowColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  itemBackgroundColor?: string;
  itemWidth?: number;
  itemHeight?: number;
  itemBorder?: string;
  fontSize?: number;
  activeItemBorderColor?: string;
  activeItemBoxShadow?: string;
};

// eslint-disable-next-line react/function-component-definition
const SliderMenu: React.FC<SliderMenuProps> = ({
  items,
  width,
  arrowColor = 'black',
  activeArrowColor = 'red',
  borderColor = 'gray',
  backgroundColor = 'white',
  itemBackgroundColor = 'lightgray',
  itemWidth = 100,
  itemHeight = 20,
  itemBorder = '1px solid gray',
  fontSize = 14,
  activeItemBorderColor = 'blue',
  activeItemBoxShadow = '2px 2px 4px rgba(0, 0, 0, 0.2)',
}) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const handleItemClick = (index: number, action: () => void) => {
    setCurrentIndex(index);
    action();
  };

  return (
    <div
      style={{
        border: `1px solid ${borderColor}`,
        borderRadius: '10px',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        height: '24px',
        backgroundColor,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          cursor: 'pointer',
          marginRight: '4px',
          width: '12px',
          height: '12px',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderRight: `6px solid ${
            hoveredIndex === null || currentIndex === 0
              ? arrowColor
              : activeArrowColor
          }`,
          borderRadius: '5px',
          transition: 'transform 0.3s ease-in-out',
          transform:
            hoveredIndex === null || currentIndex === 0
              ? 'scale(1)'
              : 'scale(1.2)',
        }}
        onClick={handlePrev}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: `${width}px`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '4px',
                backgroundColor: itemBackgroundColor,
                borderRadius: '8px',
                margin: '0 2px',
                border:
                  index === currentIndex || index === hoveredIndex
                    ? `2px solid ${activeItemBorderColor}`
                    : itemBorder,
                fontSize: `${fontSize}px`,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                cursor: 'pointer',
                boxShadow:
                  (index === currentIndex || index === hoveredIndex) &&
                  currentIndex !== -1
                    ? activeItemBoxShadow
                    : 'none',
              }}
              onClick={() => handleItemClick(index, item.action)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item.icon && (
                <div style={{ marginRight: '4px' }}>{item.icon}</div>
              )}
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          cursor: 'pointer',
          marginLeft: '4px',
          width: '12px',
          height: '12px',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: `6px solid ${
            hoveredIndex === null || currentIndex === items.length - 1
              ? arrowColor
              : activeArrowColor
          }`,
          borderRadius: '5px',
          transition: 'transform 0.3s ease-in-out',
          transform:
            hoveredIndex === null || currentIndex === items.length - 1
              ? 'scale(1)'
              : 'scale(1.2)',
        }}
        onClick={handleNext}
      />
    </div>
  );
};

export default SliderMenu;
