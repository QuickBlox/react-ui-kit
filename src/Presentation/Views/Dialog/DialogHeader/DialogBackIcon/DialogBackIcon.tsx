import React from 'react';
import './DialogBackIcon.scss';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';
import ActiveSvg from '../../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import { BackSvg } from '../../../../icons';

type RenderLeftActionsProps = {
  onClickBack: FunctionTypeVoidToVoid;
};

const DialogBackIcon: React.FC<
  RenderLeftActionsProps
  // eslint-disable-next-line react/function-component-definition
> = ({ onClickBack }: RenderLeftActionsProps) => {
  return (
    <div className="dialog-header-left-icon">
      <ActiveSvg
        content={
          // <Back width="24" height="24" applyZoom color="var(--main-elements)" />
          <BackSvg
            style={{
              width: '24px',
              height: '24px',
              color: 'var(--main-elements)',
            }}
          />
        }
        onClick={onClickBack}
      />
    </div>
  );
};

export default DialogBackIcon;
