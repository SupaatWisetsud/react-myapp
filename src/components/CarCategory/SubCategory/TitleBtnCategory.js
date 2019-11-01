import React from 'react';
import { Button } from '../../Component';

export default ({addCategory, statusAddCategory}) => (
    <div className="items-title-btn">
        <Button 
        val={!statusAddCategory? "เพิ่มประเภท" : "ยกเลิกการเพิ่มประเภท"} 
        onClick={addCategory}
        style={{padding : 3}} 
        color="#7DCEA0" 
        borderBottom="#27AE60"/>
    </div>
)