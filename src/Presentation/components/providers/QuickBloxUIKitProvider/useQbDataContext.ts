import React from 'react';
import { qbDataContext, QBDataContextType } from './QuickBloxUIKitProvider';

const useQbDataContext = (): QBDataContextType => {
  const currentQbDataContext = React.useContext(qbDataContext);

  console.log(
    `call useQbDataContext with init param: ${JSON.stringify(
      currentQbDataContext.InitParams,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    )}`,
  );
  // todo: throw exception if we have not enough data to start session or login
  let QuickBloxVersion = '';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!window.QB) {
    throw new Error('HAVE NO SDK');
  } else {
    QuickBloxVersion = `Have SDK lib: version ${QB.version} build ${QB.buildNumber}`;
    console.log(QuickBloxVersion);
  }
  if (!currentQbDataContext) {
    throw new Error('HAVE NO DATA CONTEXT');
  }
  if (!currentQbDataContext.InitParams) {
    throw new Error('HAVE NO INIT SDK DATA');
  }
  // проверять был ли обработан логин
  // если сведения для логина - ник, пароль или токен сессии
  console.log(
    'data context: update init param: ',
    JSON.stringify(currentQbDataContext.InitParams),
  );
  if (
    currentQbDataContext.InitParams.accountData.appId &&
    currentQbDataContext.InitParams.accountData.accountKey &&
    currentQbDataContext.InitParams.accountData.accountKey.length > 0
  ) {
    if (
      currentQbDataContext.InitParams.accountData.sessionToken &&
      currentQbDataContext.InitParams.accountData.sessionToken.length > 0
    ) {
      /* empty */
    } else if (
      currentQbDataContext.InitParams.accountData.authSecret &&
      currentQbDataContext.InitParams.accountData.authSecret.length > 0
    ) {
      // проверить был ли проинициализирован репозиторий этими данными
      // и залогинен юзер
      // QBInit({
      //   appIdOrToken: currentQbDataContext.QBInitParams.accountData.appId,
      //   authKeyOrAppId: currentQbDataContext.QBInitParams.accountData.authKey,
      //   authSecret: currentQbDataContext.QBInitParams.accountData.authSecret,
      //   accountKey: currentQbDataContext.QBInitParams.accountData.accountKey,
      // });
      // if (
      //   currentQbDataContext.InitParams.loginData &&
      //   currentQbDataContext.InitParams.loginData.login &&
      //   currentQbDataContext.InitParams.loginData.login.length > 0 &&
      //   currentQbDataContext.InitParams.loginData.password &&
      //   currentQbDataContext.InitParams.loginData.password.length > 0
      // ) {
      //   QuickBloxVersion = `Init SDK was success: version ${QB.version} build ${QB.buildNumber}`;
      //   console.log(QuickBloxVersion);
      //   console.log('all data to auth is collected');
      //   // currentQbDataContext.updateAuthProcessedStatus(true);
      // } else {
      //   throw new Error('HAVE NO AUTH USER DATA: login or password');
      // }
    } else {
      throw new Error('HAVE NO AUTH USER or WRONG authSecret');
    }
  } else {
    throw new Error('HAVE NO APPID OR ACCOUNT KEY');
  }

  return currentQbDataContext;
};

export default useQbDataContext;
