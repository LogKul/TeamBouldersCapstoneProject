import React from "react"
import ReactModal from "react-modal"

function Modal({ isOpen, closeModal, children }) {
    return(
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            contentLabel="Modal"
        >
            {children}
            <br/>
            <button onClick={closeModal} className='small-button'>Close</button>
        </ReactModal>
    )
}

export default Modal
