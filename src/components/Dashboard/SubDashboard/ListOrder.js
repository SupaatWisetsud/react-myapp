import React from 'react';
import Moment from 'react-moment';
import ReactToPrint from "react-to-print";
import {Button} from '../../Component';

export default ({dataOrder, order, componentRef, setPrint, uploadStatus}) => {
    
    let data = [];
    dataOrder.forEach(n => {
        if(order === n.status){
            data.push(
                <tr key={n._id}>
                    <td>{n._id}</td>
                    <td>
                        {n.data.map( (x, index) => <p key={index}> {x.name} x{x.count} </p> )}
                    </td>
                    <td>{n.price}</td>
                    <td><Moment format="DD/MM/YYYY : HH:mm">{n.dateTime}</Moment></td>
                    <td>
                        {n.status === 'q' && <Button val="รอคิวล้าง" color="#85C1E9" onClick={ e => uploadStatus(n._id, "s")} /> }
                        {n.status === 's' && <Button val="รอรับรถ" color="#82E0AA" onClick={ e => uploadStatus(n._id, "r")} /> }
                        {n.status === 'r' && 
                            <div onClick={ e => setPrint(n)}>
                                <ReactToPrint
                                    trigger={() => <Button val="พิมใบเสร็จ" color="#BB8FCE" />}
                                    content={() => componentRef}
                                />
                            </div>
                        }
                    </td>
                </tr>
            );
        }
    })
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>details</th>
                    <th>total</th>
                    <th>date</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
                {data.map(n => n)}
            </tbody>
        </table>
    )
}