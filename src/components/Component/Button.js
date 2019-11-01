import React from 'react';

export default ({val, color, borderBottom, onClick, icon, style, disabled}) => (
    <button 
    style={{backgroundColor : color, borderBottomColor : borderBottom, ...style}}
    onClick={onClick}
    disabled={disabled? true:false}>
        {icon && <i className={icon}/> } {val? val:null}
    </button>
)