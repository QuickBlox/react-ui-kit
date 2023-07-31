import {
  FunctionTypeFileToToVoid,
  FunctionTypeJSXElement,
  FunctionTypeStringToVoid,
} from '../../../../../Views/Base/BaseViewModel';

export interface InputWidget {
  renderWidget: FunctionTypeJSXElement;
  textToWidget: FunctionTypeStringToVoid;
  fileToWidget: FunctionTypeFileToToVoid;
  textToInput: string | undefined;
  fileToInput: File | undefined;
}


