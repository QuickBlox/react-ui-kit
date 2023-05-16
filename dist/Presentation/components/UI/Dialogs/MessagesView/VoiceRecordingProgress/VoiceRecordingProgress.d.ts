import React from 'react';
import './VoiceRecordingProgress.scss';
import { FunctionTypeVoidToVoid } from '../../../../../Views/Base/BaseViewModel';
type VoiceRecordingProgressProps = {
    longRecInSec: number;
    ClickActionHandler?: FunctionTypeVoidToVoid;
    TouchActionHandler?: FunctionTypeVoidToVoid;
};
declare const VoiceRecordingProgress: React.FC<VoiceRecordingProgressProps>;
export default VoiceRecordingProgress;
