import React from 'react';

export default () => (
    <form className="form-edit-password" onSubmit={this.onSubmitPassword}>
        <div className="edit-password">
            <input type="password" placeholder="รหัสเดิม" ref={this.setPassword} />
        </div>
        <div className="edit-password">
            <input type="password" placeholder="รหัสใหม่" ref={this.setNewPassword} />
        </div>
        <div className="edit-password">
            <input type="password" placeholder="ยืนยันรหัสใหม่" ref={this.setConfrimNewPassword} />
        </div>
        <div className="edit-password">
            <button>ยืนยัน</button>
        </div>
    </form>
)