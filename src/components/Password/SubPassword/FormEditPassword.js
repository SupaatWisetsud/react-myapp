import React from 'react';
import { Button } from '../../Component';

export default ({onSubmitPassword, setPassword, setNewPassword, setConfrimNewPassword}) => (
    <form className="form-edit-password" onSubmit={onSubmitPassword}>
        <div className="edit-password">
            <input type="password" placeholder="รหัสเดิม" ref={setPassword} />
        </div>
        <div className="edit-password">
            <input type="password" placeholder="รหัสใหม่" ref={setNewPassword} />
        </div>
        <div className="edit-password">
            <input type="password" placeholder="ยืนยันรหัสใหม่" ref={setConfrimNewPassword} />
        </div>
        <div className="edit-password">
            <Button val="ยืนยัน" 
            color="#3498DB" 
            borderBottom="rgb(37, 108, 156)" />
        </div>
    </form>
)