import React from 'react';
import useModal from './useModal';
import Modal, { ModalContext } from './Modal';
import { ProviderProps } from '../ProviderProps';

const { Provider } = ModalContext;

function ModalContextProvider({ children }: ProviderProps) {
  console.log('call ModalContextProvider:');
  const {
    isOpen,
    handleModal,
    modalContent,
    modalHeader,
    modalCloseTab,
    haveModalFooter,
    ModalContainerStyle,
  } = useModal();

  return (
    <Provider
      value={{
        isOpen,
        handleModal,
        modalContent,
        modalHeader,
        modalCloseTab,
        haveModalFooter,
        ModalContainerStyle,
      }}
    >
      {children}
      <Modal />
    </Provider>
  );
}

export default ModalContextProvider;
