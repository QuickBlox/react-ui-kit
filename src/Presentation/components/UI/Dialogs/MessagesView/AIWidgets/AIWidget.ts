import {
  FunctionTypeFileWithContextToToVoid,
  FunctionTypeJSXElement,
  FunctionTypeStringWithContextToVoid,
} from '../../../../../Views/Base/BaseViewModel';

export interface AIWidget {
  renderWidget: FunctionTypeJSXElement;
  textToWidget: FunctionTypeStringWithContextToVoid;
  fileToWidget: FunctionTypeFileWithContextToToVoid;
  textToContent: string | undefined;
  fileToContent: File | undefined;
}
