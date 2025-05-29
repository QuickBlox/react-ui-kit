import cn from 'classnames';
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
  disableAction?: boolean;
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
  disableAction = false,
}: AITranslateComponentProps) {
  const options = languages.map((lang) => ({ value: lang, label: lang }));

  async function translateHandler(translateLanguage: string) {
    if (loading || disableAction) {
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
        className={cn('ai-translate__caption', {
          'translate__caption--disable': loading,
        })}
      >
        <div
          className={cn('ai-translate__caption__label', {
            'ai-translate__caption__label--disable': disableAction,
          })}
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
          disabled={loading || disableAction}
          onSelect={(language) => {
            translateHandler(language);
          }}
        >
          <div className="ai-translate__icon">
            <TranslateSvg
              className={cn('ai-translate__icon__media-translate', {
                'ai-translate__icon__media-translate--disable': disableAction,
              })}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
