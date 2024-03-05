import cn from 'classnames';

import { LoaderSvg } from '../../icons';
import './Loader.scss';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Loader({ className, size }: LoaderProps) {
  return (
    <LoaderSvg className={cn('loader', size && `loader--${size}`, className)} />
  );
}
