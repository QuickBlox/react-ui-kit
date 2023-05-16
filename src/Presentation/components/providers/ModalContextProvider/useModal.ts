import React, { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>('');
  const [modalHeader, setModalHeader] = React.useState<string>('');
  const [modalCloseTab, setModalCloseTab] = React.useState<boolean>(true);
  const [haveModalFooter, setHaveModalFooter] = React.useState<boolean>(true);
  const [ModalContainerStyle, setModalContainerStyle] =
    useState<React.CSSProperties>({});
  const handleModal = (
    show: boolean,
    content: React.ReactNode,
    headerText?: string,
    withoutCloseTab?: boolean,
    withoutFooter?: boolean,
    haveModalContainerStyle?: React.CSSProperties,
  ) => {
    setIsOpen(show);
    if (content) setModalContent(content);
    if (headerText) setModalHeader(headerText);
    setModalCloseTab(!withoutCloseTab);
    setHaveModalFooter(withoutFooter || false);
    if (haveModalContainerStyle)
      setModalContainerStyle(haveModalContainerStyle);
  };

  return {
    isOpen,
    handleModal,
    modalContent,
    modalHeader,
    modalCloseTab,
    haveModalFooter,
    ModalContainerStyle,
  };
};

export default useModal;
