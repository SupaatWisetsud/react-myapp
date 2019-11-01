import React from 'react';

const style = {
    backgroundColor:"transparent",
    border:"none",
    cursor: "pointer",
    outline: "none",
    padding : "0px 5px",
    color : "#FFF",
    borderRadius : 5
}

export default ({basket, confrimProduct, dispatch, addProduct}) => {

    function downProduct(data) {
        dispatch({
            type : "down",
            payload : data
        });
    }

    function deleteProduct(data) {
        dispatch({
            type : "delete",
            payload : data
        });
    }
    let total = 0;
    return(
        <div className="basket">
            <div className="title-basket">
                <h2>
                    รายการล้างรถ
                </h2>
            </div>
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
                            <button onClick={ e => downProduct(n)} style={{...style, backgroundColor : "#F1948A", borderBottom : "2px solid #C0392B"}}>-</button>
                            <h5 className="items-basket-count">{n.count}</h5>
                            <button onClick={ e => addProduct(n)} style={{...style, backgroundColor : "#5DADE2", borderBottom : "2px solid #2471A3"}}>+</button>
                        </div>
                        <div>
                            <h5>{n.price}</h5>
                        </div>
                        <div>
                            <button onClick={e => deleteProduct(n)} className="car-basket-close">ลบ</button>
                        </div>
                    </div>
                ))}

            </div>

            <div className="items-total-basket">
                <div>
                    <h2>
                        ราคารวม :
                    </h2>
                </div>
                <div>
                    <h2>
                        {basket.forEach( n => {
                            let x = Number.parseInt(n.count) * Number.parseInt(n.price);
                            total += x;
                        })}
                        {total} บาท
                    </h2>
                </div>
            </div>
            <div className="items-confrim-basket">
                <button onClick={ confrimProduct } className="confrim">ทำรายการ</button>
                <button onClick={ e => dispatch({type : "destroy", payload : []})} className="all-close">ยกเลิกรายการ</button>
            </div>
        </div>
    )
}