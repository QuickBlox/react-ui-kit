import React from 'react';
import './RenderLeftActions.scss';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';
import UiKitTheme from '../../../../themes/UiKitTheme';
import ActiveSvg from '../../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import Back from '../../../../components/UI/svgs/Icons/Navigation/Back';

type RenderLeftActionsProps = {
  onClickBack: FunctionTypeVoidToVoid;
  theme?: UiKitTheme;
};
// RenderRightActions
// RenderLeftActions
const RenderLeftActions: React.FC<
  RenderLeftActionsProps
  // eslint-disable-next-line react/function-component-definition
> = ({
  onClickBack,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: RenderLeftActionsProps) => {
  return (
    <div className="dialog-header-left-icon">
      <ActiveSvg
        content={
          <Back width="24" height="24" applyZoom color="var(--main-elements)" />
        }
        onClick={onClickBack}
        onTouch={onClickBack}
      />
    </div>
  );
};

export default RenderLeftActions;
