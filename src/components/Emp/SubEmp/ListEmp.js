import React from 'react';
import { decode } from 'jsonwebtoken';
import { Button } from '../../Component';

export default ({data, statusUser, deleteUser}) => (
        <div className="emp">
            <table>
                <thead>
                    <tr>
                        <th>ชื่อ</th>
                        <th>อีเมลล์</th>
                        <th>เบอร์โทร</th>
                        <th>รูป</th>
                        <th>สถานะ</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((n, index) => (
                            <tr key={index} style={(index % 2)? {backgroundColor : "#FFF"} : {backgroundColor : "#EBF5FB"}}>
                                <td> {n.firstName + " " + n.lastName} </td>
                                <td> {n.email} </td>
                                <td> 0{n.phone} </td>
                                <td>
                                    <img src={"http://localhost:4000" + n.profileImg} alt={n.username} style={{width:80,height:60, objectFit : "cover", borderRadius : 10}}/>
                                </td>
                                <td>
                                    {decode(localStorage.getItem('token'))._doc._id !== n._id? 
                                        <Button 
                                        val={n.status === 'a'? "ผู้ดูแล":"พนักงานทั่วไป"} 
                                        color={n.status === 'a'? "#AF7AC5":"#85C1E9"} 
                                        onClick={e => statusUser(n._id, n.status)}/>
                                        :
                                        <Button 
                                        val={n.status === 'a'? "ผู้ดูแล":"พนักงานทั่วไป"} 
                                        color="#AF7AC5" 
                                        style={{opacity : "0.3", cursor : "no-drop"}} 
                                        disabled={true} />
                                    }
                                </td>
                                <td>
                                    {decode(localStorage.getItem('token'))._doc._id !== n._id? 
                                        <Button 
                                        val="ลบ" 
                                        color="#EC7063" 
                                        onClick={e => deleteUser(n._id)}/>
                                        :
                                        <Button 
                                        val="ลบ"
                                        color="#EC7063" 
                                        style={{opacity : "0.3", cursor : "no-drop"}} 
                                        disabled={true} />
                                    }
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
)