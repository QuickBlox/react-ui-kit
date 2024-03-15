import { ReactNode, createContext } from 'react';
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
        position="top-center"
        autoClose={3000}
        bodyClassName="toast__body"
        toastClassName="toast"
        pauseOnHover={false}
        closeButton={false}
        hideProgressBar
      />
      {children}
    </ToastContext.Provider>
  );
}
