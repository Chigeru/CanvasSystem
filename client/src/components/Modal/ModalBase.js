import React, { useState, createContext, useContext } from "react";
import Modal from "react-bootstrap/Modal";


const ModalClosureContext = createContext();
export const useModalClosure = () => useContext(ModalClosureContext);


function ModalBase({modalTitle, children}) {
  const [show, setShow] = useState(false);
  const contextvalue = [show, setShow];
  
  function HandleOpen() {
    setShow(true);
  }
  function HandleClose() {
    setShow(false);
  }
  
  return (
    <>
      <button className="btn btn-primary" onClick={HandleOpen}>
        {modalTitle}
      </button>

      <Modal show={show} onHide={HandleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalClosureContext.Provider value={contextvalue} >
            {children}
          </ModalClosureContext.Provider>
        </Modal.Body>
        
      </Modal>

    </>
  );
}

export default ModalBase;
