import React from 'react';

export default () => (
    <React.Fragment>
        <div className="title">
            <div className="items-title-product">
                <h1>
                    เพิ่มพนักงาน
                </h1>
            </div>
            <div className="items-title-btn">
                <button className="add-product" onClick={this.switchAdd}>
                    กลับไปหน้ารายการพนักงาน
                </button>
            </div>
        </div>
        <div className="emp">
            <form className="form-emp" onSubmit={this.subMit} >
                <div>
                    <input type="text" placeholder="Username" onChange={this.setUsername} />
                </div>
                <div>
                    <input type="password" placeholder="Password" onChange={this.setPassword}/>
                </div>
                <div className="name">
                    <div>
                        <input type="text" placeholder="Frist name" onChange={this.setFname} />
                    </div>
                    <div>
                        <input type="text" placeholder="Last name" onChange={this.setLname} />
                    </div>
                </div>
                <div>
                    <input type="email" placeholder="examp@mail.com" onChange={this.setEmail} />
                </div>
                <div>
                    <input type="file" onChange={this.setFile} />
                </div>
                <div>
                    <input type="number" placeholder="09X-XXX-XXXX" onChange={this.setPhone} />
                </div>
                <div>
                    <button>เพิ่มพนักงาน</button>
                </div>
            </form>
        </div>
    </React.Fragment>
)