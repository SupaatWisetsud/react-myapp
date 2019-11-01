import React from 'react';
import {Button} from '../../Component';

export default ({seleteOrderDate, reset, changeDateStart, changeDateEnd}) => (
    <div className="form-select-order">
        <p>ตั้งแต่วัน</p>
        <input type="date" onChange={changeDateStart} />
        <p> ถึง </p>
        <input type="date" onChange={changeDateEnd} />
        
        <Button 
        val="ค้นหา" 
        icon="fas fa-search" 
        color="#C39BD3" 
        borderBottom="#AF7AC5" 
        onClick={seleteOrderDate} 
        style={{borderRadius:5}}/>

        <Button 
        val="รีเซ็ต" 
        icon="fas fa-history" 
        color="#7DCEA0" 
        borderBottom="#229954" 
        onClick={reset} 
        style={{borderRadius:5}}/>

    </div>
)