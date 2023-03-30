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
            <button onClick={closeModal}>Close</button>
        </ReactModal>
    )
}

export default Modal
