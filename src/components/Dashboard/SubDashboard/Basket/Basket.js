import React from 'react';
import {Button} from '../../../Component';

export default ({basket, confrimProduct, dispatch, addProduct}) => {

    function downProduct(data) {dispatch({type : "down",payload : data})}

    function deleteProduct(data) {dispatch({type : "delete",payload : data})}

    let total = 0;
    basket.forEach( n => {total += Number.parseInt(n.count) * Number.parseInt(n.price)});
    
    return(
        <div className="basket">
            <div className="title-basket"> <h2> รายการล้างรถ </h2> </div>
            <div className="sub-basket">
                <div className="items-basket header-items-basket">
                    <div>รูป</div> 
                    <div>ชื่อ</div>
                    <div>จำนวน</div> 
                    <div>ราคา</div> 
                    <div>ลบ</div> 
                </div>
                {basket.map(n => (
                    <div className="items-basket" key={n._id}>
                        <div>
                            <img src={"http://localhost:4000" + n.image} alt={n.name} style={{width:60,height:40}}/>
                        </div>
                        <div>
                            <h5>{n.name}</h5>
                        </div>
                        <div>
                            <Button val="-" onClick={ e => downProduct(n)} color="#F1948A" borderBottom="#C0392B" />
                            <h5 className="items-basket-count">{n.count}</h5>
                            <Button val="+" onClick={ e => addProduct(n)} color="#5DADE2" borderBottom="#2471A3" />
                        </div>
                        <div>
                            <h5>{n.price}</h5>
                        </div>
                        <div>
                            <Button val="ลบ" onClick={ e => deleteProduct(n)} color="#E74C3C" borderBottom="rgb(194, 66, 52)" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="items-total-basket">
                <div> <h2> ราคารวม : </h2> </div>
                <div><h2>{total} บาท</h2></div>
            </div>
            <div className="items-confrim-basket">
                <Button val="ทำรายการ" onClick={ confrimProduct } color="#5DADE2" borderBottom="#2980B9" />
                <Button val="ยกเลิกรายการ" onClick={ e => dispatch({type : "destroy", payload : []}) } color="#E74C3C" borderBottom="#A93226" />
            </div>
        </div>
    )
}