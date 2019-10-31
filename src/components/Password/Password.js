import React from 'react';
import axios from 'axios';
import { decode } from 'jsonwebtoken';

const endpoint = "http://localhost:4000/api";

class Password extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            loading : false,
            error : {
                status : false,
                message : ''
            },
            success : {
                status : false,
                message : ''
            },
            password : '',
            newPassword : '',
            confrimNewPassword : ''
        }

        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
        this.setConfrimNewPassword = this.setConfrimNewPassword.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onSubmitPassword = async e => {

        e.preventDefault();

        if(this.state.password.value === '' || this.state.newPassword.value === '' || this.state.confrimNewPassword.value === ''){
            this.setState({
                error : {
                    status : true,
                    message : "กรุณาใส่ข้อมูลให้ครบ!"
                }
            });
        }else if(this.state.password.value === this.state.newPassword.value){
            this.setState({
                error : {
                    status : true,
                    message : "เปลี่ยนทำควยอะไรถ้าจะใช้รหัสเดิม"
                }
            });
        }else{
            if(this.state.newPassword.value === this.state.confrimNewPassword.value){

                this.setState({
                    loading : true
                });

                let data = {
                    id : decode(localStorage.getItem('token'))._doc._id,
                    password : this.state.password.value,
                    newPassword : this.state.newPassword.value
                }
                
                await axios.put(endpoint + "/user", data).then(res => {
                    // console.log(res.data);
                    if(res.data.success){
                        this.setState({
                            loading : false,
                            success : {
                                status : true,
                                message : "เปลี่ยนรหัสผ่านเสร็จสิ้น"
                            }
                        });
                    }else{
                        this.setState({
                            loading : false,
                            error : {
                                status : true,
                                message : res.data.data
                            }
                        });
                    }
                });
                
                this.state.password.value = '';
                this.state.newPassword.value = '';
                this.state.confrimNewPassword.value = '';
            }else{
                this.setState({
                    error : {
                        status : true,
                        message : "รหัสใหม่ของท่านไม่ตรงกัน!"
                    }
                });
            }
        }
    }

    setPassword = e => {
        this.setState({
            password : e
        });
    }
    setNewPassword = e => {
        this.setState({
            newPassword : e
        });
    }
    setConfrimNewPassword = e => {
        this.setState({
            confrimNewPassword : e
        });
    }

    onDismiss = () => {
        this.setState({
            success : {
                status : false,
                message : ""
            },
            error : {
                status : false,
                message : ""
            }
        });
    }
    render(){
        return(
            <React.Fragment>
                {
                    this.state.error.status && 
                    <div className="container-error">
                        <div className="flash">
                            {this.state.error.message}
                            <button className="close-popup" onClick={this.onDismiss}>X</button>
                        </div>
                    </div>
                }
                {
                    this.state.success.status && 
                    <div className="container-success">
                        <div className="success">
                            {this.state.success.message}
                            <button className="close-popup" onClick={this.onDismiss}>X</button>
                        </div>
                    </div>
                }
                <div className="title">
                    <div className="items-title">
                        <h2>
                            แก้รหัสผ่าน
                        </h2>
                    </div>
                </div>
                <div className="password">
                    {
                        this.state.loading ? 
                        <div style={{
                            width : "100%",
                            height : "100%",
                            display : "flex",
                            justifyContent : "center",
                            alignItems : "center",
                            fontSize : 24,
                            color : "#333333"
                        }}><i className="fas fa-spinner"/>Loading...</div> 
                        : 
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
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Password;