import React from 'react';
import {Button} from '../../Component';

export default ({loading, data, addCategory}) => (
    <div className="product">
        {loading && <div className="list-product-loading"><i className="fas fa-spinner"/>Loading...</div> }
        {data.map(n => {
            return (
                <div className="items-product" key={n._id}>
                    <div className="img-product">
                        <img src={"http://localhost:4000" + n.image} alt={n.name}/>
                    </div>
                    <div className="title-product">
                        {n.name}
                    </div>
                    <div className="price-product">
                        ราคา {n.price} บาท
                    </div>
                    <div className="selete-product">
                        <Button 
                        val="เลือก" 
                        color="#52BE80" 
                        borderBottom="rgb(63, 146, 99)" 
                        style={{margin : 0, width : "100%"}} 
                        onClick={ e => addCategory(n) } 
                        icon="fas fa-shopping-basket" />
                    </div>
                </div>
            )
        })}
    </div>
)