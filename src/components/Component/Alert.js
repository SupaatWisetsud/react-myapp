import React from 'react';

export default ({onClick, message, color}) => (
    <div className={"alert"}>
        <div className={color}>
                {message}
            <span className="close-popup" onClick={onClick}>X</span>
        </div>
    </div>
)