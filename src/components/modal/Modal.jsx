import React from 'react';
import "./Modal.css";

function Modal({ open, onClose, children }) {

    if (!open) return null
    return (
        <div className="overlay" onClick={() => onClose(true)} >
            <div className="modalContainer" onClick={e => e.stopPropagation()}>
                <div className='modal-body'>
                    {children}
                </div>
                <button onClick={onClose} className="closeBtn">X</button>
            </div>
        </div>
    )
}

export default Modal
