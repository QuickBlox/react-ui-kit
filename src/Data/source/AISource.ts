import { stringifyError } from '../../utils/parse';
import RepositoryException from './exception/RepositoryException';

export interface IChatMessage {
  role: string;
  content: string;
}
export type AIParam = {
  textToAI: string;
  context: IChatMessage[];
};

export class AISource {
  static async getData(
    prompt: string,
    dialogMessages: IChatMessage[],
    servername: string,
    api: string,
    port: string,
    sessionToken: string,
    openAIModel = 'gpt-3.5-turbo',
  ): Promise<string> {
    const apiEndpoint = `${servername}/${api}`;
    const apiKey = sessionToken;
    const model = openAIModel; // 'gpt-3.5-turbo';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [...dialogMessages, { role: 'user', content: prompt }],
        model,
        temperature: 0.5,
      }),
    };

    try {
      const response = await fetch(apiEndpoint, requestOptions);
      const data = await response.json();

      const outputMessage = data.choices[0].message?.content || '';

      return outputMessage;
    } catch (err) {
      const outputMessage: string = stringifyError(err);

      throw new RepositoryException(outputMessage, -1);
    }
  }

  static async getDataWithOpenAI(
    prompt: string,
    dialogMessages: IChatMessage[],
    servername: string,
    api: string,
    port: string,
    sessionToken: string,
    openAIModel = 'gpt-3.5-turbo',
  ): Promise<string> {
    const apiEndpoint = `${servername}/${api}`;
    const apiKey = sessionToken;
    const model = openAIModel; // 'gpt-3.5-turbo';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [...dialogMessages, { role: 'user', content: prompt }],
        model,
        temperature: 0.5,
      }),
    };

    try {
      const response = await fetch(apiEndpoint, requestOptions);
      const data = await response.json();

      const outputMessage = data.choices[0].message?.content || '';

      return outputMessage;
    } catch (err) {
      const outputMessage: string = stringifyError(err);

      throw new RepositoryException(outputMessage, -1);
    }
  }

  static async getDataWithProxyServer(
    prompt: string,
    dialogMessages: IChatMessage[],
    servername: string,
    api: string,
    port: string,
    sessionToken: string,
    openAIModel = 'gpt-3.5-turbo',
  ): Promise<string> {
    const apiEndpoint = `${servername}:${port}/${api}`;
    const apiKey = sessionToken;
    const model = openAIModel; // 'gpt-3.5-turbo';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'qb-token': apiKey,
      },
      body: JSON.stringify({
        messages: [...dialogMessages, { role: 'user', content: prompt }],
        model,
        temperature: 0.5,
      }),
    };

    try {
      const response = await fetch(apiEndpoint, requestOptions);
      const data = await response.json();

      const outputMessage = data.choices[0].message?.content || '';

      return outputMessage;
    } catch (err) {
      const outputMessage: string = stringifyError(err);

      throw new RepositoryException(outputMessage, -1);
    }
  }
}
