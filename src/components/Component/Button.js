import React from 'react';

export default ({val, color, borderBottom, onClick, icon, style}) => (
    <button style={{backgroundColor : color, borderBottomColor : borderBottom, ...style}} onClick={onClick}>
        {icon && <i className={icon}/> } {val? val:null}
    </button>
)