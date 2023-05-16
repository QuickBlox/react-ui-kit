import React, { useEffect } from 'react';
import { qbDataContext } from './QuickBloxUIKitProvider';
import ConnectionRepository from '../../../../Data/repository/ConnectionRepository';

type QBConnectionInfo = {
  connectionRepository: ConnectionRepository;
  browserOnline: boolean;
};
const useQBConnection = (): QBConnectionInfo => {
  const currentQbDataContext = React.useContext(qbDataContext);
  const [navigatorOnline, setNavigatorOnline] = React.useState(
    navigator.onLine,
  );

  useEffect(() => {
    const setOnline = () => {
      setNavigatorOnline(true);
    };
    const setOffline = () => {
      setNavigatorOnline(false);
    };

    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return {
    browserOnline: navigatorOnline,
    connectionRepository: currentQbDataContext.storage.CONNECTION_REPOSITORY,
  };
};

export default useQBConnection;
