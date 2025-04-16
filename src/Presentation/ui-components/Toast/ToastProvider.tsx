import React, { ReactNode, createContext } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Toast.scss';

const ToastContext = createContext(undefined);

interface ToastProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProps) {
  return (
    <ToastContext.Provider value={undefined}>
      <ToastContainer
        className="qb-container"
        position="top-center"
        autoClose={3000}
        bodyClassName="qb-toast__body"
        toastClassName="qb-toast"
        pauseOnHover={false}
        closeButton={false}
        hideProgressBar
      />
      {children}
    </ToastContext.Provider>
  );
}
