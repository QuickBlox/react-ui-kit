import './HighLightLink.scss';
import React from 'react';

const pattern =
  '^(https?:\\/\\/)?' + // protocol
  '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])*\\.)+' + // sub-domain + domain name
  '[a-zA-Z]{2,13})' + // extension
  '|((\\d{1,3}\\.){3}\\d{1,3})' + // OR ip (v4) address
  '|localhost)' + // OR localhost
  '(\\:\\d{1,5})?' + // port
  '(\\/[a-zA-Z\\&\\d%_.~+-:@]*)*' + // path
  '(\\?[a-zA-Z\\&\\d%_.,~+-:@=;&]*)?' + // query string
  '(\\#[-a-zA-Z&\\d_]*)?$'; // fragment locator

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

  strings.forEach((s: string) => {
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
//
// export const HighLightLink: React.FC<HighLightLinkProps> = ({
//   urlText,
// }: HighLightLinkProps) => {
//   return (
//     <div className="high-light-link-container">
//       <div className="high-light-link-container--header-wrapper">
//         <a
//           href={urlText}
//           target="blank"
//           className="high-light-link-container--header-wrapper__link_url"
//         >
//           {getNameUrl(urlText)}
//         </a>
//       </div>
//       <div className="high-light-link-container--footer-wrapper">
//         <div className="high-light-link-container--footer-wrapper__content">
//           {getURIParts(urlText).host}
//         </div>
//       </div>
//     </div>
//   );
// };

// eslint-disable-next-line react/function-component-definition
export const HighLightLink: React.FC<HighLightLinkProps> = ({
  messageText,
}: HighLightLinkProps) => {
  const strings = messageText.split(/\n| /);
  const elements = strings.map((item, index) => {
    if (isURL(item)) {
      return (
        <span>
          <a key={index} href={`${getRuleUrl(item)}`} target="blank">
            {item}
          </a>{' '}
        </span>
      );
    }

    return <span>{item} </span>;
  });

  return <div>{elements}</div>;
};
