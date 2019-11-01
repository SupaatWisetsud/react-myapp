import React from 'react';
import axios from 'axios';
import { decode } from 'jsonwebtoken';

import {Alert} from '../Component';
import {FormEditPassword, TitlePassword} from './SubPassword';

const endpoint = "http://localhost:4000/api";

class Password extends React.Component{

    state = {
        loading : false,
        error : { status : false, message : '' },
        success : { status : false, message : ''},
        password : '',
        newPassword : '',
        confrimNewPassword : ''
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

    setPassword = e => {this.setState({password : e})}
    setNewPassword = e => {this.setState({newPassword : e})}
    setConfrimNewPassword = e => {this.setState({confrimNewPassword : e})}

    onDismiss = () => {
        this.setState({
            success : {status : false, message : ""},
            error : { status : false, message : "" }
        });
    }
    render(){
        return(
            <React.Fragment>
                {
                    this.state.error.status && 
                    <Alert message={this.state.error.message} onClick={this.onDismiss} color="danger" />
                }
                {
                    this.state.success.status && 
                    <Alert message={this.state.success.message} onClick={this.onDismiss} color="success" />
                }
                <TitlePassword />
                <div className="password">
                    {
                        this.state.loading ? 
                        <div className="isLoading"><i className="fas fa-spinner"/>Loading...</div> 
                        : 
                        <FormEditPassword 
                        onSubmitPassword={this.onSubmitPassword} 
                        setPassword={this.setPassword}
                        setNewPassword={this.setNewPassword}
                        setConfrimNewPassword={this.setConfrimNewPassword} />
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Password;