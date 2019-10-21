import React from 'react';
import { connect } from 'react-redux';

const style = {
    backgroundColor:"transparent",
    border:"none",
    cursor: "pointer",
    outline: "none"
}

function Basket(props) {
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
                        <button style={style}>-</button>
                        <h5 className="items-basket-count">{n.count}</h5>
                        <button style={style}>+</button>
                    </div>
                    <div>
                        <h5>{n.price}</h5>
                    </div>
                    <div>
                        <button className="car-basket-close">ลบ</button>
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