import React from 'react';

export default ({subMit, setUsername, setPassword, setFname, setLname, setEmail, setFile, setPhone}) => (
    <div className="emp">
        <form className="form-emp" onSubmit={subMit} >
            <div>
                <input type="text" placeholder="Username" onChange={setUsername} />
            </div>
            <div>
                <input type="password" placeholder="Password" onChange={setPassword}/>
            </div>
            <div className="name">
                <div>
                    <input type="text" placeholder="Frist name" onChange={setFname} />
                </div>
                <div>
                    <input type="text" placeholder="Last name" onChange={setLname} />
                </div>
            </div>
            <div>
                <input type="email" placeholder="examp@mail.com" onChange={setEmail} />
            </div>
            <div>
                <input type="file" onChange={setFile} />
            </div>
            <div>
                <input type="number" placeholder="09X-XXX-XXXX" onChange={setPhone} />
            </div>
            <div>
                <button>เพิ่มพนักงาน</button>
            </div>
        </form>
    </div>
)