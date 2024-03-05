import React from 'react';
import './DialogInfoIcon.scss';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';
import UiKitTheme from '../../../../themes/UiKitTheme';
import ActiveSvg from '../../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import InformationFill from '../../../../components/UI/svgs/Icons/Status/InformationFill';

type RenderRightActionsProps = {
  onClickInfo: FunctionTypeVoidToVoid;
  theme?: UiKitTheme;
};
const DialogInfoIcon: React.FC<
  RenderRightActionsProps
  // eslint-disable-next-line react/function-component-definition
> = ({
  onClickInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: RenderRightActionsProps) => {
  return (
    //
    <div className="dialog-header-right">
      {/* TODO: phone button // Phone Btn */}
      {/* <div className="dialog-header-right-icon"> */}
      {/*   <ActiveSvg */}
      {/*    content={<Phone width="24" height="24" applyZoom />} */}
      {/*    onClick={() => { */}
      {/*      if (CallHandler) CallHandler(); */}
      {/*    }} */}
      {/*    onTouch={() => { */}
      {/*      if (CallHandler) CallHandler(); */}
      {/*    }} */}
      {/*   /> */}
      {/* </div> */}

      <div className="dialog-header-right-icon">
        <ActiveSvg
          content={
            <InformationFill
              width="24"
              height="24"
              applyZoom
              color="var(--main-elements)"
            />
          }
          onClick={() => {
            if (onClickInfo) onClickInfo();
          }}
          onTouch={() => {
            if (onClickInfo) onClickInfo();
          }}
        />
      </div>
    </div>
  );
};

export default DialogInfoIcon;
