import React from 'react';
import { Button } from '../../Component';

export default ({addCategory, statusAddCategory}) => (
    <div className="items-title-btn">
        <Button 
        val={!statusAddCategory? "เพิ่มประเภท" : "ยกเลิกการเพิ่มประเภท"} 
        icon={!statusAddCategory? "fas fa-plus":"fas fa-minus"}
        onClick={addCategory}
        style={{padding : "2px 20px"}} 
        color="#7DCEA0" 
        borderBottom="#27AE60"/>
    </div>
)