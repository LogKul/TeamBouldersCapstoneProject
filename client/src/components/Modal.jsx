import React from "react"
import ReactModal from "react-modal"

function Modal({ isOpen, closeModal, children }) {
    return(
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
        >
            {children}
            <br/>
            <button onClick={closeModal}>Close</button>
        </ReactModal>
    )
}

export default Modal
