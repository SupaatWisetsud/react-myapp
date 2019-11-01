import React from 'react';
import { Button } from '../../Component';

export default ({data, deleteProduct}) => (
    <table>
        <thead>
            <tr>
                <th>ชื่อ</th>
                <th>ราคา</th>
                <th>รูป</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
            </tr>
        </thead>
        <tbody>
            {data.map((n, index) => {
                return (
                    <tr key={index} style={(index % 2)? {backgroundColor : "#FFF"} : {backgroundColor : "#EBF5FB"}}>
                        <td>{n.name}</td>
                        <td>{n.price}</td>
                        <td><img src={"http://localhost:4000" + n.image} alt={n.name} style={{width:100,height:60}}/></td>
                        <td><Button val="แก้ไข" color="#F9E79F" borderBottom="#F1C40F" /></td>
                        <td><Button icon="far fa-trash-alt" onClick={ e => deleteProduct(n._id) } color="#EC7063" borderBottom="#CB4335" /></td>
                    </tr>
                )
            })}
        </tbody>
    </table>
)