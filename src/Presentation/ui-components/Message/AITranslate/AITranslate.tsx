import './AITranslate.scss';
import {
  FunctionTypeStringToVoid,
  FunctionTypeVoidToVoid,
} from '../../../../CommonTypes/BaseViewModel';
import Dropdown from '../../Dropdown/Dropdown';
import { ReactComponent as TranslateSvg } from '../../../icons/actions/translate.svg';
import { Option } from '../../Dropdown/DropdownOption';

interface AITranslateComponentProps {
  onTranslate: FunctionTypeStringToVoid;
  onClickOriginalText: FunctionTypeVoidToVoid;
  originalTextMessage: boolean;
  waitAIWidget: boolean;
  defaultLanguageForAITranslate: string;
  languagesForAITranslate: string[];
}

export default function AITranslate({
  onTranslate,
  onClickOriginalText,
  originalTextMessage,
  waitAIWidget,
  defaultLanguageForAITranslate,
  languagesForAITranslate,
}: AITranslateComponentProps) {
  // eslint-disable-next-line @typescript-eslint/no-shadow

  const options: Option[] = [];

  if (languagesForAITranslate.length > 0) {
    languagesForAITranslate.forEach((item) => {
      options.push({ value: item, label: item });
    });
  }

  return (
    <div className="ai-translate">
      <div
        className={
          waitAIWidget ? 'translate__caption--disable' : 'ai-translate__caption'
        }
      >
        <div
          className="ai-translate__caption__label"
          onClick={() => {
            if (waitAIWidget) return;

            if (originalTextMessage) {
              onTranslate(defaultLanguageForAITranslate);
            } else {
              onClickOriginalText();
            }
          }}
        >
          {originalTextMessage ? 'Show translation' : 'Show original'}
        </div>
      </div>
      <div>
        <Dropdown
          options={options}
          disabled={waitAIWidget}
          onSelect={(language) => onTranslate(language)}
        >
          <div
            // className={
            //   waitAIWidget
            //     ? 'ai-translate__icon-disable'
            //     : 'ai-translate__icon'
            // }
            className="ai-translate__icon"
          >
            <TranslateSvg className="ai-translate__icon__media-translate" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
