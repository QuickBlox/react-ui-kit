import './HighLightLink.scss';
import React from 'react';

const pattern =
  /(https?:\/\/)?([\p{L}\p{N}_-]+(?:(?:\.[\p{L}\p{N}_-]+)+)[\p{L}\p{N}.,@?^=%&:/~+#-]*[\p{L}\p{N}@?^=%&/~+#-])/gu;

function removeLastPunctuation(str: string): string {
  const punctuationRegex = /[!;%:?*_.,:-]/;
  const decimalSeparatorRegex = /[.,]/;

  if (str.length > 0) {
    const lastChar = str.charAt(str.length - 1);

    if (
      punctuationRegex.test(lastChar) ||
      decimalSeparatorRegex.test(lastChar)
    ) {
      return str.slice(0, -1);
    }
  }

  return str;
}

export const isURL = (str: string) => {
  const regex = new RegExp(pattern);

  // return regex.test(str);
  const result = regex.test(str) || regex.test(removeLastPunctuation(str));
  // const result = str.match(pattern);

  return result;
};

const getURIParts = (url: string) => {
  const matches = url.match(/^(\w+?:\/\/)?([\w-\\.]+(?=\/?))?:?(\d*)?([^:]*)/);

  return {
    scheme: matches ? matches[1] : undefined,
    host: matches ? matches[2] : '',
    port: matches ? matches[3] : undefined,
    pathname: matches ? matches[4] : '',
  };
};

const getRuleUrl = (url: string) => {
  const uriParts = getURIParts(url);
  let result = url;

  if (uriParts.scheme === undefined) {
    result = `http://${url}`;
  }

  return result;
};

export const messageHasUrls = (message: string) => {
  let result = 0;

  const strings = message.split(/\n| /);
  // const onlyDigit = /^\d+$/;

  strings.forEach((s: string) => {
    // if (s.length < 1160 && !onlyDigit.test(s))
    if (s.match(pattern) || removeLastPunctuation(s).match(pattern)) {
      result += 1;
    }
  });

  return result > 0;
};

type HighLightLinkProps = {
  messageText: string;
};

// eslint-disable-next-line react/function-component-definition
export const HighLightLink = ({
  messageText,
}: HighLightLinkProps) => {
  /*
// todo: need to add  this replace to the messageText
messageText.replace(
            /(https?:\/\/)?([\p{L}\p{N}_-]+(?:(?:\.[\p{L}\p{N}_-]+)+)[\p{L}\p{N}.,@?^=%&:/~+#-]*[\p{L}\p{N}@?^=%&/~+#-])/gu,
            (url, protocol, path) =>
              `<a href="${
                protocol || typeof path !== 'string' ? url : `http://${path}`
              }" rel="noopener noreferrer" target="_blank">${url}</a>`,
          )
    */
  const strings = messageText.split(/\n| /);
  const elements = strings.map((item, index) => {
    if (isURL(item)) {
      return (
        <div className="message-urls">
          <span>
            <a
              key={index}
              href={`${getRuleUrl(item)}`}
              target="_blank"
              rel="noreferrer"
            >
              {item}
            </a>{' '}
          </span>
        </div>
      );
    }

    return <span>{item} </span>;
  });

  return <div>{elements}</div>;
};
