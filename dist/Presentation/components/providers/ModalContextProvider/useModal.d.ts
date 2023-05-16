import React from 'react';
declare const useModal: () => {
    isOpen: boolean;
    handleModal: (show: boolean, content: React.ReactNode, headerText?: string, withoutCloseTab?: boolean, withoutFooter?: boolean, haveModalContainerStyle?: React.CSSProperties) => void;
    modalContent: React.ReactNode;
    modalHeader: string;
    modalCloseTab: boolean;
    haveModalFooter: boolean;
    ModalContainerStyle: React.CSSProperties;
};
export default useModal;
