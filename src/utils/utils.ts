// import { encode } from 'gpt-3-encoder';

import { MessageEntity } from '../Domain/entity/MessageEntity';
import { IChatMessage } from '../Data/source/AISource';
import {
  Tone,
  toneToString,
} from '../Presentation/Views/Dialog/AIWidgets/Tone';

export const completeSentence = (text?: string) =>
  text?.replace(/([^.!?;]+)[^.!?;]*$/, ' ...') || '';

// export const tokenCounter = (text?: string) => (text ? encode(text).length : 0);

export const tokenCounter = (text?: string) => (text ? text.length / 4 : 0);

export const loopToLimitTokens = <T>(
  limit: number,
  data: T[],
  getValue: (item: T) => string = (item) =>
    typeof item === 'string' ? item : String(item),
  tokens = 0,
): T[] => {
  if (!data.length) {
    return [];
  }

  const [firstItem, ...lastItems] = data;

  const itemValue = getValue(firstItem);
  const itemTokens = tokenCounter(itemValue);
  const amountTokens = tokens + itemTokens;

  if (amountTokens <= limit) {
    const nextData = loopToLimitTokens(
      limit,
      lastItems,
      getValue,
      amountTokens,
    );

    return itemTokens === 0 ? nextData : [firstItem, ...nextData];
  }

  return [];
};

export class AIUtils {
  public static createTranslatePrompt(textToSend: string, language?: string) {
    let prompt = `Please, translate the next text in english and give me just only translated text. Text to translate is: "${textToSend}"`;

    if (language) {
      prompt = `Please, translate the next text in ${language} and give me just only translated text. Text to translate is: "${textToSend}"`;
    }

    return prompt;
  }

  public static createAnswerAssistPrompt(textToSend: string) {
    const prompt = `You are a customer support chat operator. Your goal is to provide helpful and informative responses to customer inquiries. Give a response to the next user's query, considering the entire conversation context, and use grammar and vocabulary at the A2-B2 level. Answer in the format of simple sentences. Do not include question in answer. Please, provide answer for this issue:"${textToSend}"`;

    return prompt;
  }

  public static createRephrasePrompt(textToSend: string, tone?: Tone) {
    let prompt = `Analyze the entire context of our conversation – all the messages – and create a brief summary of our discussion. Based on this analysis, rephrase the following text in a style and tone that is typical for most of the dialogue messages. Provide only the rephrased text in as the message text to rephrase and nothing more.Give me only rephrase text in brackets and nothing more. Here is the message text to rephrase:"${textToSend}"`;

    if (tone) {
      prompt = `Analyze the entire context of our conversation – all the messages – and create a brief summary of our discussion. Based on this analysis, rephrase the following text in a ${toneToString(
        tone,
      )} style. Provide only the rephrased text in the same language as the message text to rephrase and nothing more.Give me only rephrase text in brackets and nothing more. Here is the message text to rephrase:"${textToSend}"`;
    }

    return prompt;
  }

  public static messageEntitiesToIChatMessageCollection(
    messageEntities: MessageEntity[],
    currentUserId: number | undefined,
    MAX_TOKENS = 3584,
  ): IChatMessage[] {
    const items = messageEntities.filter(
      (it) =>
        !it.notification_type ||
        (it.notification_type && it.notification_type.length === 0),
    );
    const messages = loopToLimitTokens(
      MAX_TOKENS,
      items,
      ({ message }) => message || '',
    ).reverse();
    const chatCompletionMessages: IChatMessage[] = messages.map(
      ({ message, sender_id }) => ({
        role: sender_id === currentUserId ? 'user' : 'assistant',
        content: message,
      }),
    );

    //
    return chatCompletionMessages;
  }
}
