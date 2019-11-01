import React from 'react';

export default ({order}) => (
    <>
    <div className="items-title">
        {order === "h" && <h2>ระบบจัดการหน้าร้าน Car ca Service</h2>}
        {order === "q" && <h2>รายการรอคิวล้าง</h2>}
        {order === "s" && <h2>รายการล้างเสร็จแล้ว</h2>}
        {order === "r" && <h2>รายการรับรถแล้ว</h2>}
    </div>
    </>
)