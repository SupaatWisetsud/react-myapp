import React from 'react';
import {Button} from '../../Component';

export default ({order, _order}) => (
    <div className="items-title-btn">
        {order !== "h"? <Button val="หน้าหลัก" icon="fas fa-store-alt" color="#5D6D7E" borderBottom="#2C3E50" onClick={ e => _order("h")} />:null }
        <Button val="รายการรอคิวล้าง" icon="fas fa-car-side" color="#85C1E9" borderBottom="#2E86C1" onClick={ e => _order("q")} />
        <Button val="รานการล้างเสร็จแล้ว" icon="fas fa-car" color="#58D68D" borderBottom="#27AE60" onClick={ e => _order("s")} />
        <Button val="รายการที่รับรถแล้ว" icon="fas fa-calendar-check" color="#C39BD3" borderBottom="#7D3C98" onClick={ e => _order("r")} />
    </div>
)