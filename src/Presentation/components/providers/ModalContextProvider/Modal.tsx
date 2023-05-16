import React from 'react';
import './Modal.scss';
import Close from '../../UI/svgs/Icons/Navigation/Close';

type ModalContextType = {
  isOpen: boolean;
  handleModal: (
    show: boolean,
    content: React.ReactNode,
    headerText?: string,
    withoutClose?: boolean,
    haveModalFooter?: boolean,
    haveModalContainerStyle?: React.CSSProperties,
  ) => void;
  modalContent: React.ReactNode;
  modalHeader: string;
  modalCloseTab: boolean;
  haveModalFooter: boolean;
  ModalContainerStyle: React.CSSProperties;
};
const initValue: ModalContextType = {
  isOpen: false,
  modalCloseTab: true,
  haveModalFooter: true,
  modalHeader: '',
  modalContent: '',
  handleModal: () => {
    console.log('empty function');
  },
  ModalContainerStyle: {},
};

export const ModalContext = React.createContext<ModalContextType>(initValue);

function Modal() {
  const {
    isOpen,
    handleModal,
    modalContent,
    modalHeader,
    modalCloseTab,
    haveModalFooter,
    ModalContainerStyle,
  } = React.useContext(ModalContext);

  const onClickHandler = () => {
    handleModal(false, '');
  };
  const questionSizeBox: React.CSSProperties = haveModalFooter
    ? {
        minHeight: '160px',
        minWidth: '380px',
        maxHeight: '160px',
        maxWidth: '380px',
        backgroundColor: 'var(--main-background)',
        // border: '3px solid blue',
      }
    : ModalContainerStyle || {};

  return (
    <div className="modal-container-overlay" aria-expanded={isOpen}>
      {isOpen ? (
        <div style={questionSizeBox} className="modal-container">
          {modalCloseTab && (
            <div className="modal-container__close" onClick={onClickHandler}>
              <Close width="24" height="24" color="var(--secondary-elements)" />
            </div>
          )}
          <div
            style={haveModalFooter ? { marginBottom: '30px' } : {}}
            className="modal-container__subtitle"
          >
            {modalHeader}
          </div>
          <div className="modal-container__content">{modalContent}</div>
          {/* {haveModalFooter && ( */}
          {/*  <div className="modal-container__footer"> */}
          {/*    <RowRightContainer */}
          {/*      minHeightContainer="32px" */}
          {/*      gapBetweenItem="8px" */}
          {/*      RightContainerSize={{ */}
          {/*        flexBasis: '63px', */}
          {/*        minWidth: '63px', */}
          {/*        maxWidth: '63px', */}
          {/*        minHeight: '32px', */}
          {/*        maxHeight: '32px', */}
          {/*      }} */}
          {/*      RightItem={ */}
          {/*        <div> */}
          {/*          <button */}
          {/*            style={{ */}
          {/*              width: '62px', */}
          {/*              height: '31px', */}
          {/*              borderRadius: '4px', */}
          {/*            }} */}
          {/*            type="button" */}
          {/*          > */}
          {/*            Next */}
          {/*          </button> */}
          {/*        </div> */}
          {/*      } */}
          {/*      CenterContainerSize={{ */}
          {/*        flexBasis: '78px', */}
          {/*        minWidth: '78px', */}
          {/*        maxWidth: '78px', */}
          {/*        minHeight: '32px', */}
          {/*        maxHeight: '32px', */}
          {/*      }} */}
          {/*      CenterItem={ */}
          {/*        <div> */}
          {/*          <button */}
          {/*            style={{ */}
          {/*              width: '78px', */}
          {/*              height: '31px', */}
          {/*              borderRadius: '4px', */}
          {/*            }} */}
          {/*            type="button" */}
          {/*          > */}
          {/*            Cancel */}
          {/*          </button> */}
          {/*        </div> */}
          {/*      } */}
          {/*    /> */}
          {/*  </div> */}
          {/* )} */}
        </div>
      ) : null}
    </div>
  );
}
export default Modal;
