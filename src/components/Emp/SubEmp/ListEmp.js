import React from 'react';
import { decode } from 'jsonwebtoken';

export default () => (
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
                                    <img src={"http://localhost:4000" + n.profileImg} alt={n.username} style={{width:80,height:60, objectFit : "cover", borderRadius : 10}}/>
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