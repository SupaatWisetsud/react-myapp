import React from 'react';
import axios from 'axios';

const endpoint = "http://localhost:4000/api";

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            data: []
        };
        this.selectProduct = this.selectProduct.bind();
    }
    
    async componentDidMount(){

        await axios.get(endpoint + "/list-product").then(res => {
            this.setState({
                data : res.data.result
            });
        });
        
    }

    selectProduct = id => {
        console.log(id);
    }

    render(){
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
                        {this.state.data[0] === undefined && <div className="list-product-loading"><i className="fas fa-spinner"/>Loading...</div> }
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
                                        <button onClick={ e => this.selectProduct(n._id) }>เลือก</button>
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
                            {/* <div className="items-basket">
                                
                            </div> */}
                        </div>
                        <div className="items-total-basket">
                            <div>
                                <h2>
                                    ราคารวม :
                                </h2>
                            </div>
                            <div>
                                <h2>
                                    200 บาท
                                </h2>
                            </div>
                        </div>
                        <div className="items-confrim-basket">
                            {/* <a className="confrim">ทำรายการ</a> */}
                            {/* <a className="all-close">ยกเลิกรายการ</a> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    
    
}

export default Home;