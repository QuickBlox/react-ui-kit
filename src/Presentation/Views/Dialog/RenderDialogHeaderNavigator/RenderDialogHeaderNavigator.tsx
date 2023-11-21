import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';
import UiKitTheme from '../../../themes/UiKitTheme';
import ActiveSvg from '../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import InformationFill from '../../../components/UI/svgs/Icons/Status/InformationFill';

type RenderDialogHeaderNavigatorProps = {
  onClickInfo: FunctionTypeVoidToVoid;
  theme?: UiKitTheme;
};
const RenderDialogHeaderNavigator: React.FC<
  RenderDialogHeaderNavigatorProps
  // eslint-disable-next-line react/function-component-definition
> = ({
  onClickInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: RenderDialogHeaderNavigatorProps) => {
  return (
    <div className="detail-button">
      <div className="detail-button__call" style={{ width: '32px' }}>
        {/* <ActiveSvg */}
        {/*  content={<Phone width="32" height="32" applyZoom />} */}
        {/*  clickAction={() => { */}
        {/*    if (CallHandler) CallHandler(); */}
        {/*  }} */}
        {/*  touchAction={() => { */}
        {/*    if (CallHandler) CallHandler(); */}
        {/*  }} */}
        {/* /> */}
      </div>
      <div className="detail-button__info">
        <ActiveSvg
          content={
            <InformationFill
              width="32"
              height="32"
              applyZoom
              color="var(--secondary-background)"
            />
          }
          clickAction={() => {
            if (onClickInfo) onClickInfo();
          }}
          touchAction={() => {
            if (onClickInfo) onClickInfo();
          }}
        />
      </div>
    </div>
  );
};

export default RenderDialogHeaderNavigator;
