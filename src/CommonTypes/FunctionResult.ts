import { Tone } from '../Presentation/Views/Dialog/AIWidgets/Tone';

export type FunctionResult<T> = {
  result: T | T[] | boolean;
  error: any;
};
