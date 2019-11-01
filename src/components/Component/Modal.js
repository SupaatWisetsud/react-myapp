import React from 'react';
import { Button } from '.';


export default ({children, modalTitle, onClose}) => (
    <div className="container-modal">
        <div className="modal">
            <span onClick={onClose} ><i className="fas fa-times"></i></span>
            <div className="modal-title">{modalTitle}</div>
            <hr/>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
                <Button val="ตกลง" color="#82E0AA" borderBottom="#28B463" style={{width:"100%", margin : 0}} />
            </div>
        </div>
    </div>
)