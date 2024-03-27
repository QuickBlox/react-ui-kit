import React, { useEffect } from 'react';
import { qbDataContext } from './QuickBloxUIKitProvider';
import ConnectionRepository from '../../../Data/repository/ConnectionRepository';

type QBConnectionInfo = {
  connectionRepository: ConnectionRepository;
  browserOnline: boolean;
  connectionStatus: boolean;
};
const useQBConnection = (): QBConnectionInfo => {
  const currentQbDataContext = React.useContext(qbDataContext);
  const [navigatorOnline, setNavigatorOnline] = React.useState(
    navigator.onLine,
  );
  const [connectStatus, setConnectStatus] = React.useState(
    currentQbDataContext.storage.CONNECTION_REPOSITORY.isChatConnected(),
  );

  currentQbDataContext.storage.CONNECTION_REPOSITORY.subscribe((status) => {
    console.log(`Connection status: ${status ? 'CONNECTED' : 'DISCONNECTED'}`);
    if (status) setConnectStatus(true);
    else setConnectStatus(false);
  });
  useEffect(() => {
    const setOnline = () => {
      setNavigatorOnline(true);
      setConnectStatus(
        currentQbDataContext.storage.CONNECTION_REPOSITORY.isChatConnected(),
      );
    };
    const setOffline = () => {
      setNavigatorOnline(false);
      setConnectStatus(
        currentQbDataContext.storage.CONNECTION_REPOSITORY.isChatConnected(),
      );
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
    connectionStatus: connectStatus,
  };
};

export default useQBConnection;
