import React from 'react';
import axios from 'axios';
import { decode } from 'jsonwebtoken';

const endpoint = "http://localhost:4000/api";

class Emp extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
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
        
        this.switchAdd = this.switchAdd.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setFname = this.setFname.bind(this);
        this.setLname = this.setLname.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setFile = this.setFile.bind(this);
        this.setPhone = this.setPhone.bind(this);
        this.subMit = this.subMit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.statusUser = this.statusUser.bind(this);
    }

    async componentDidMount(){
        this.setState({
            loading : true
        });

        await axios.get(endpoint + "/emp").then(res => {
            this.setState({
                loading : false,
                data : res.data.data
            });
        });
    }

    switchAdd = () => {
        this.setState({
            addEmp : !this.state.addEmp
        })
    }

    setUsername = e => {
        this.setState({
            username : e.target.value
        });
    }
    setPassword = e => {
        this.setState({
            password : e.target.value
        });
    }
    setFname = e => {
        this.setState({
            fname : e.target.value
        });
    }
    setLname = e => {
        this.setState({
            lname : e.target.value
        });
    }
    setEmail = e => {
        this.setState({
            email : e.target.value
        });
    }
    setFile = e => {
        this.setState({
            file : e.target.files[0]
        });
    }
    setPhone = e => {
        this.setState({
            phone : e.target.value
        });
    }

    subMit = async e => {
        e.preventDefault();

        this.setState({
            loading : true
        });

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
        this.setState({
            loading : true
        });
        await axios.delete(endpoint +"/emp", {data : {id}});

        await axios.get(endpoint + "/emp").then(res => {
            this.setState({
                loading : false,
                data : res.data.data
            });
        });
    }

    statusUser = async (id, status) => {
        this.setState({
            loading : true
        });

        if(status === "a"){
            status = "u"
        }else{
            status = "a"
        }

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
            return <div style={{
                width : "100%",
                height : "100%",
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                fontSize : 24,
                color : "#333333"
            }}><i className="fas fa-spinner"/>Loading...</div> 
        }else{
            if(this.state.addEmp){
                return (
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
                );
            }else{
                return (
                    <React.Fragment>
                        <div className="title">
                            <div className="items-title-product">
                                <h1>
                                    รายการพนักงาน
                                </h1>
                            </div>
                            <div className="items-title-btn">
                                <button className="add-product" onClick={this.switchAdd}>
                                    เพิ่มพนักงาน
                                </button>
                            </div>
                        </div>
                        <div className="emp">
                            <table>
                                <thead>
                                    <tr>
                                        {/* <th>รหัส</th> */}
                                        <th>ชื่อ</th>
                                        <th>อีเมลล์</th>
                                        <th>เบอร์โทร</th>
                                        <th>รูป</th>
                                        <th>สถานะ</th>
                                        <th>ลบ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((n, index) => {
                                        
                                        return (
                                            <tr key={index} style={(index % 2)? {backgroundColor : "#FFF"} : {backgroundColor : "#EBF5FB"}}>
                                                {/* <td>
                                                    {n._id}
                                                </td> */}
                                                <td>
                                                    {n.firstName + " " + n.lastName}
                                                </td>
                                                <td>
                                                    {n.email}
                                                </td>
                                                <td>
                                                    0{n.phone}
                                                </td>
                                                <td>
                                                    <img src={"http://localhost:4000" + n.profileImg} alt={n.username} style={{width:80,height:60}}/>
                                                </td>
                                                <td>
                                                    {decode(localStorage.getItem('token'))._doc._id !== n._id? 
                                                        <button onClick={e => this.statusUser(n._id, n.status)} style={n.status === 'a'? {backgroundColor:"#AF7AC5"}:{backgroundColor:"#85C1E9"} }>
                                                            {n.status === 'a'? "ผู้ดูแล":"พนักงานทั่วไป"}
                                                        </button> 
                                                        :
                                                        <button disabled style={{backgroundColor:"#AF7AC5", opacity : "0.3", cursor : "no-drop"}}>
                                                            {n.status === 'a'? "ผู้ดูแล":"พนักงานทั่วไป"}
                                                        </button>
                                                    }
                                                    
                                                </td>
                                                <td>
                                                    {decode(localStorage.getItem('token'))._doc._id !== n._id? 
                                                        <button className="delete" onClick={e => this.deleteUser(n._id)} >ลบ</button>
                                                        :
                                                        <button className="delete" disabled style={{opacity : "0.3", cursor : "no-drop"}} >ลบ</button>
                                                    }
                                                    
                                                </td>
                                            </tr>
                                        )
                                        
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>
                )
            }
        }
    }
}

export default Emp;