import React from 'react';
import {Button} from '../../Component';

export default ({val, switchAdd, switchPage}) => (
    <div className="title">
        <div className="items-title-product">
            <h1> {val} </h1>
        </div>
        <div className="items-title-btn">
            <Button 
            val={switchPage? "ยกเลิกการเพิ่มพนักงาน":"เพิ่มพนักงาน"} 
            onClick={switchAdd} 
            color="#7DCEA0"
            borderBottom="#27AE60"/>
        </div>
    </div>
)