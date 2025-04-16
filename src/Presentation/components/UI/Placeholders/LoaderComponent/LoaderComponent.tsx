import './LoaderComponent.scss';
// import Loader from '../../svgs/Icons/Status/Loader';
import { IconTheme } from '../../svgs/Icons/IconsCommonTypes';
import { LoaderSvg } from '../../../../icons';

export default function LoaderComponent(
  theme: IconTheme | undefined = undefined,
) {
  const loaderStyles = theme
    ? {
        animation: 'spin 1s linear infinite',
        svg: {
          path: {
            fill: theme?.color ? theme?.color : '',
          },
        },
        minWidth: theme?.width,
        minHeight: theme?.height,
        Loader: {
          fill: theme?.color ? theme?.color : '',
        },
        fill: theme?.color ? theme?.color : '',
      }
    : {};
  const loaderClasses = [
    theme && Object.keys(theme).length > 0 ? '' : 'qb-loader',
  ].join(' ');

  return (
    <div style={loaderStyles} className={loaderClasses}>
      {theme ? (
        <LoaderSvg className="qb-loader" />
      ) : (
        // <Loader
        //   color={theme?.color}
        //   width={theme?.width}
        //   height={theme?.height}
        // />
        // <Loader />
        <LoaderSvg className="qb-loader" />
      )}
    </div>
  );
}
