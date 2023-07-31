import React from 'react';
import { qbDataContext, QBDataContextType } from './QuickBloxUIKitProvider';

const useQbUIKitDataContext = (): QBDataContextType => {
  const currentQbDataContext: QBDataContextType =
    React.useContext(qbDataContext);

  return currentQbDataContext;
};

export default useQbUIKitDataContext;
