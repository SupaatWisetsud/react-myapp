import React from 'react';
import { connect } from 'react-redux';

const style = {
    backgroundColor:"transparent",
    border:"none",
    cursor: "pointer",
    outline: "none"
}

function Basket(props) {

    function addProduct(data){   
        props.dispatch({
            type : "add",
            data : data
        });
    }

    function downProduct(data) {
        props.dispatch({
            type : "down",
            data : data
        });
    }

    function deleteProduct(data) {
        props.dispatch({
            type : "delete",
            data : data
        });
    }

    return(
        props.basket.map(n => {
            return (
                <div className="items-basket" key={n._id}>
                    <div>
                        <img src={"http://localhost:4000" + n.image} alt={n.name} style={{width:60,height:40}}/>
                    </div>
                    <div>
                        <h5>{n.name}</h5>
                    </div>
                    <div>
                        <button onClick={ e => downProduct(n)} style={style}>-</button>
                        <h5 className="items-basket-count">{n.count}</h5>
                        <button onClick={ e => addProduct(n)} style={style}>+</button>
                    </div>
                    <div>
                        <h5>{n.price}</h5>
                    </div>
                    <div>
                        <button onClick={e => deleteProduct(n)} className="car-basket-close">ลบ</button>
                    </div>
                </div>
            );
        })
    )
}

const mapStateStore = (state) => {
    return {
        basket : state.basketReducer
    };
}

export default connect(mapStateStore)(Basket);