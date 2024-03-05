import './ErrorComponent.scss';
import React from 'react';
import { IconTheme } from '../../svgs/Icons/IconsCommonTypes';
import Error from '../../svgs/Icons/Status/Error';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';
import ColumnContainer from '../../../containers/ColumnContainer/ColumnContainer';

type ErrorComponentProps = {
  title?: string;
  ClickActionHandler?: FunctionTypeVoidToVoid;
  TouchActionHandler?: FunctionTypeVoidToVoid;
  theme?: IconTheme;
};
// eslint-disable-next-line react/function-component-definition
const ErrorComponent: React.FC<ErrorComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ClickActionHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TouchActionHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: ErrorComponentProps) => {
  return (
    <div className="error-container-wrapper">
      <ColumnContainer>
        <div
          style={{ width: '52px', height: '52px' }}
          className="error-container__error-icon"
        >
          {theme ? <Error color={theme?.color} /> : <Error />}
        </div>
        <div className="error-container__error-message">{title}</div>
        <div
          className="error-container--error-action"
          onClick={ClickActionHandler}
          onTouchStart={TouchActionHandler}
        >
          {/* <div className="error-container--error-action__refresh-icon"> */}
          {/*  <Refresh height="24" width="24" color={theme?.color} applyZoom /> */}
          {/* </div> */}
          {/* <div className="error-container--error-action__refresh-text"> */}
          {/*  Retry */}
          {/* </div> */}
        </div>
      </ColumnContainer>
    </div>
  );
};

export default ErrorComponent;
