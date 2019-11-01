import React from 'react';
import axios from 'axios';

import {AddEmp,ListEmp,TitleEmp} from './SubEmp';

const endpoint = "http://localhost:4000/api";

class Emp extends React.Component {
    
    state = {
        loading : false,
        data : [],
        addEmp : false,
        username : '',
        password : '',
        fname : '',
        lname : '',
        email : '',
        file : '',
        phone : ''
    }

    async componentDidMount(){
        this.setState({loading : true});

        await axios.get(endpoint + "/emp").then(res => {
            this.setState({loading : false, data : res.data.data});
        });
    }

    switchAdd = () => {this.setState({addEmp : !this.state.addEmp})}

    setUsername = e => {this.setState({username : e.target.value})}
    setPassword = e => {this.setState({password : e.target.value})}
    setFname = e => {this.setState({fname : e.target.value})}
    setLname = e => {this.setState({lname : e.target.value})}
    setEmail = e => {this.setState({email : e.target.value})}
    setFile = e => {this.setState({file : e.target.files[0]})}
    setPhone = e => {this.setState({phone : e.target.value})}

    subMit = async e => {
        e.preventDefault();

        this.setState({loading : true});

        let fd = new FormData();

        fd.append("username", this.state.username);
        fd.append("password", this.state.password);
        fd.append("firstName", this.state.fname);
        fd.append("lastName", this.state.lname);
        fd.append("email", this.state.email);
        fd.append("phone", this.state.phone);
        fd.append("file", this.state.file);
        
        await axios.post(endpoint +"/emp", fd);

        await axios.get(endpoint + "/emp").then(res => {
            this.setState({
                data : res.data.data,
                loading : false,           
                addEmp : false,
                username : '',
                password : '',
                fname : '',
                lname : '',
                email : '',
                file : '',
                phone : ''
            });
        });
    }

    deleteUser = async id => {
        this.setState({loading : true});
        
        await axios.delete(endpoint +"/emp", {data : {id}});

        await axios.get(endpoint + "/emp").then(res => {
            this.setState({
                loading : false,
                data : res.data.data
            });
        });
    }

    statusUser = async (id, status) => {
        this.setState({loading : true});

        if(status === "a") status = "u";
        else status = "a";

        await axios.put(endpoint +"/emp", {id, status});

        await axios.get(endpoint + "/emp").then(res => {
            this.setState({
                loading : false,
                data : res.data.data
            });
        });
    }

    render(){
        if(this.state.loading){
            return <div className="isloading"><i className="fas fa-spinner"/>Loading...</div> 
        }else{
            return (
                <React.Fragment>
                    <TitleEmp switchAdd={this.switchAdd} val="รายการพนักงาน" switchPage={this.state.addEmp} />
                    {this.state.addEmp? 
                        <AddEmp 
                        switchAdd={this.switchAdd} 
                        subMit={this.subMit}
                        setUsername={this.setUsername}
                        setPassword={this.setPassword}
                        setFname={this.setFname}
                        setLname={this.setLname}
                        setEmail={this.setEmail}
                        setFile={this.setFile}
                        setPhone={this.setPhone}/> :

                        <ListEmp 
                        data={this.state.data}
                        switchAdd={this.switchAdd}
                        statusUser={this.statusUser}
                        deleteUser={this.deleteUser}/>
                    }
                </React.Fragment>
            )
        }
    }
}

export default Emp;