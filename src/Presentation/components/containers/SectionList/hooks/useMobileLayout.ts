import { useState, useLayoutEffect } from 'react';

export default function useMobileLayout() {
  const useMobile =
    !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  const breakpoint = 980;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [isMobile, setIsMobile] = useState(useMobile);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return [isMobile, width, height, breakpoint];
}
