import React from 'react';
import './Modal.scss';
type ModalContextType = {
    isOpen: boolean;
    handleModal: (show: boolean, content: React.ReactNode, headerText?: string, withoutClose?: boolean, haveModalFooter?: boolean, haveModalContainerStyle?: React.CSSProperties) => void;
    modalContent: React.ReactNode;
    modalHeader: string;
    modalCloseTab: boolean;
    haveModalFooter: boolean;
    ModalContainerStyle: React.CSSProperties;
};
export declare const ModalContext: React.Context<ModalContextType>;
declare function Modal(): import("react/jsx-runtime").JSX.Element;
export default Modal;
