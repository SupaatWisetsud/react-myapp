import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Basket from './Basket.jsx';

const endpoint = "http://localhost:4000/api";

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            data: [],
            loading : false
        };
        this.addProduct = this.addProduct.bind(this);
    }
    
    async componentDidMount(){
        this.setState({
            loading : true
        });
        await axios.get(endpoint + "/list-product").then(res => {
            this.setState({
                data : res.data.result,
                loading : false
            });
        });
        
    }

    addProduct = data => {   
        this.props.dispatch({
            type : "add",
            data : data
        });
    }

    render(){
        let total = 0;
        return(
            <React.Fragment>
                <div className="title">
                    <div className="items-title">
                        <h2>
                            ระบบจัดการหน้าร้าน Car ca Service
                        </h2>
                    </div>
                    <div className="items-title-btn">

                    </div>
                </div>
                <div className="shop">
                    <div className="product">
                        {this.state.loading && <div className="list-product-loading"><i className="fas fa-spinner"/>Loading...</div> }
                        {this.state.data.map(n => {
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
                                        <button onClick={ e => this.addProduct(n) }>เลือก</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
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

                            <Basket />
                            
                        </div>
                        <div className="items-total-basket">
                            <div>
                                <h2>
                                    ราคารวม :
                                </h2>
                            </div>
                            <div>
                                <h2>
                                    {this.props.basket.forEach( n => {
                                        let x = Number.parseInt(n.count) * Number.parseInt(n.price);
                                        total += x;
                                    })}
                                    {total} บาท
                                </h2>
                            </div>
                        </div>
                        <div className="items-confrim-basket">
                            <button className="confrim">ทำรายการ</button>
                            <button onClick={ e => this.props.dispatch({type : "destroy", data : []})} className="all-close">ยกเลิกรายการ</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateStore = (state) => {
    return {
        basket : state.basketReducer
    };
}

export default connect(mapStateStore)(Home);