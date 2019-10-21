import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const endpoint = "http://localhost:4000/api";

export default function Login(props) {

    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let username, password;

    const headlerSubmit = async (e) => {

        e.preventDefault();

        let data = {
            username : username.value,
            password : password.value
        }
        
        setLoading(true);

        await axios.post(endpoint, data)
        .then(res => {
            setLoading(false);
            if(res.data.success){
                localStorage.setItem("token", res.data.token);
                setRedirect(true);
            }else{
                alert("Username หรือ Password ของท่านไม่ถูกต้อง");
            }
        });
    }

    return (
        
        <div className="warpper">
            {redirect && <Redirect to="/" />}
            {localStorage.getItem("token") && <Redirect to="/" />}

            <div className="container">
                <form id="form-login" onSubmit={ headlerSubmit }>
                    <div className="logo">
                        <h1>
                            Car ca
                        </h1>
                    </div>
                    <div className="grid-login">
                        <div className="items-login">
                            <input type="text" name="username" ref={ e => username = e} placeholder="Username" />
                        </div>
                        <div className="items-login">
                            <input type="password" name="password" ref={ e => password = e} placeholder="Password" />
                        </div>
                        <div className="items-login">
                            <button type="submit" disabled={loading}>
                                {loading && <i className="fas fa-spinner"></i>}
                                เข้าสู่ระบบ
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}