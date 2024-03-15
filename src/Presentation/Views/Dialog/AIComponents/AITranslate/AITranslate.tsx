import Dropdown from '../../../../ui-components/Dropdown/Dropdown';
import { ReactComponent as TranslateSvg } from '../../../../icons/actions/translate.svg';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { AIMessageWidget } from '../../AIWidgets/AIMessageWidget';
import { AIUtils } from '../../../../../utils/utils';
import './AITranslate.scss';

interface AITranslateComponentProps {
  AITranslateWidget: AIMessageWidget;
  originalTextMessage: boolean;
  loading?: boolean;
  defaultLanguage: string;
  languages: string[];
  maxTokens?: number;
  onLoading: (isLoading: boolean, id: string) => void;
  onError: (messageError: string) => void;
  onTranslated: (id: string, textTranslated: string) => void;
  messageToTranslate?: MessageEntity;
  messageHistory?: MessageEntity[];
  currentUserId?: number;
}

export default function AITranslate({
  AITranslateWidget,
  originalTextMessage,
  loading = false,
  defaultLanguage,
  languages,
  maxTokens,
  onLoading,
  onError,
  onTranslated,
  messageToTranslate,
  messageHistory,
  currentUserId,
}: AITranslateComponentProps) {
  const options = languages.map((lang) => ({ value: lang, label: lang }));

  async function translateHandler(translateLanguage: string) {
    if (loading) {
      return;
    }

    if (!messageToTranslate || !messageHistory) {
      onError('Translation failed.');
      onLoading(false, messageToTranslate ? messageToTranslate.id : '0');
      onTranslated(messageToTranslate ? messageToTranslate.id : '0', '');

      return;
    }

    onLoading(true, messageToTranslate.id);

    try {
      const textTranslate = await AITranslateWidget.textToWidget(
        messageToTranslate.message,
        AIUtils.messageEntitiesToIChatMessageCollection(
          messageHistory,
          currentUserId,
          maxTokens,
        ),
        { language: translateLanguage },
      );

      if (textTranslate === 'Translation failed.') {
        onError('Translation failed.');
        onTranslated(messageToTranslate.id, '');
      } else {
        onTranslated(messageToTranslate.id, textTranslate || '');
      }
    } catch (error) {
      onError('Translation failed.');
      onTranslated(messageToTranslate.id, '');
    } finally {
      onLoading(false, messageToTranslate.id);
    }
  }

  return (
    <div className="ai-translate">
      <div
        className={
          loading ? 'translate__caption--disable' : 'ai-translate__caption'
        }
      >
        <div
          className="ai-translate__caption__label"
          onClick={() => {
            if (originalTextMessage) {
              translateHandler(defaultLanguage);
            } else {
              onTranslated(
                messageToTranslate ? messageToTranslate.id : '0',
                '',
              );
            }
          }}
        >
          {originalTextMessage ? 'Show translation' : 'Show original'}
        </div>
      </div>
      <div>
        <Dropdown
          options={options}
          disabled={loading}
          onSelect={(language) => {
            translateHandler(language);
          }}
        >
          <div className="ai-translate__icon">
            <TranslateSvg className="ai-translate__icon__media-translate" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
