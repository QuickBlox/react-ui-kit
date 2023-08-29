import {
  FunctionTypeFileWithContextToToVoid,
  FunctionTypeJSXElement,
  FunctionTypeStringWithContextToString,
} from '../../../../../Views/Base/BaseViewModel';

export interface AIWidget {
  renderWidget: FunctionTypeJSXElement;
}
export interface AITextWidget extends AIWidget {
  textToContent: string | undefined;
}

export interface AIFileWidget extends AIWidget {
  fileToContent: File | undefined;
}

export interface AIMessageWidget extends AITextWidget {
  textToWidget: FunctionTypeStringWithContextToString;
}

export interface AIAttachmentWidget extends AIFileWidget {
  fileToWidget: FunctionTypeFileWithContextToToVoid;
}
