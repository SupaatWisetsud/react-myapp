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
            loading : false,
            order : "h",
            dataOrder : []
        };
        this.addProduct = this.addProduct.bind(this);
        this.confrimProduct = this.confrimProduct.bind(this);
    }
    
    async componentDidMount(){
        this.setState({
            loading : true
        });
        await axios.get(endpoint + "/product").then(res => {
            this.setState({
                data : res.data.result
            });
        });

        await axios.get(endpoint + "/order").then(res => {
            this.setState({
                dataOrder : res.data.data,
                loading : false
            });
        });
        
    }

    addProduct = data => {   
        this.props.dispatch({
            type : "add",
            payload : data
        });
    }

    confrimProduct = async () => {
        if(this.props.basket[0] !== undefined){
            if(window.confirm("ยืนยันการทำรายการไหม ?")){
                const data = this.props.basket;
                await axios.post(endpoint + '/order', {data});
                
                this.props.dispatch({type : "reset", payload : []});
                

                await axios.get(endpoint + "/order").then(res => {
                    this.setState({ dataOrder : res.data.data});
                });
            }
        }else{
            alert("คุณไม่มีข้อมูลในรายการ!!");
        }
    }

    order = e => {
        this.setState({
            order : e
        });
    }

    render(){
        let total = 0;
        let x = [];
        this.state.dataOrder.forEach(n => {
            if(this.state.order === n.status){
                x.push(
                    <tr key={n._id}>
                        <td>{n._id}</td>
                        <td>
                            {n.data.map( (x, index) => <p key={index}> {x.name} x{x.count} </p> )}
                        </td>
                        <td>{n.price}</td>
                        <td>{n.dateTime}</td>
                        <td>
                            {n.status === 'q' && <button className="que-btn">รอคิวล้าง</button> }
                            {n.status === 's' && <button className="success-btn">รอรับรถ</button> }
                            {n.status === 'r' && <button className="receive-btn">พิมใบเสร็จ</button> }
                        </td>
                    </tr>
                );
            }
        })
        return(
            <React.Fragment>
                <div className="title">
                    <div className="items-title">
                        {this.state.order === "h" && <h2>ระบบจัดการหน้าร้าน Car ca Service</h2>}
                        {this.state.order === "q" && <h2>รายการรอคิวล้าง</h2>}
                        {this.state.order === "s" && <h2>รายการล้างเสร็จแล้ว</h2>}
                        {this.state.order === "r" && <h2>รายการรับรถแล้ว</h2>}
                    </div>
                    <div className="items-title-btn">
                        {
                            this.state.order === "h" && 
                            <React.Fragment>
                                <button style={{backgroundColor : "#85C1E9"}} onClick={ e => this.order("q")} >รายการรอคิวล้าง</button>
                                <button style={{backgroundColor : "#58D68D"}} onClick={ e => this.order("s")} >รานการล้างเสร็จแล้ว</button>
                                <button style={{backgroundColor : "#C39BD3"}} onClick={ e => this.order("r")} >รายการที่รับรถแล้ว</button>
                            </React.Fragment>
                        }
                        {
                            this.state.order === "q" && 
                            <React.Fragment>
                                <button style={{backgroundColor : "#5D6D7E"}} onClick={ e => this.order("h")} >หน้าหลัก</button>
                                <button style={{backgroundColor : "#58D68D"}} onClick={ e => this.order("s")} >รานการล้างเสร็จแล้ว</button>
                                <button style={{backgroundColor : "#C39BD3"}} onClick={ e => this.order("r")} >รายการที่รับรถแล้ว</button>
                            </React.Fragment>
                        }
                        {
                            this.state.order === "s" && 
                            <React.Fragment>
                                <button style={{backgroundColor : "#5D6D7E"}} onClick={ e => this.order("h")} >หน้าหลัก</button>
                                <button style={{backgroundColor : "#85C1E9"}} onClick={ e => this.order("q")} >รายการรอคิวล้าง</button>
                                <button style={{backgroundColor : "#C39BD3"}} onClick={ e => this.order("r")} >รายการที่รับรถแล้ว</button>
                            </React.Fragment>
                        }
                        {
                            this.state.order === "r" && 
                            <React.Fragment>
                                <button style={{backgroundColor : "#5D6D7E"}} onClick={ e => this.order("h")} >หน้าหลัก</button>
                                <button style={{backgroundColor : "#85C1E9"}} onClick={ e => this.order("q")} >รายการรอคิวล้าง</button>
                                <button style={{backgroundColor : "#58D68D"}} onClick={ e => this.order("s")} >รานการล้างเสร็จแล้ว</button>
                            </React.Fragment>
                        }
                        
                    </div>
                </div>
                <div className="shop">
                    {
                        this.state.order === "h" && 
                        <React.Fragment>
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
                                    <button onClick={ this.confrimProduct } className="confrim">ทำรายการ</button>
                                    <button onClick={ e => this.props.dispatch({type : "destroy", payload : []})} className="all-close">ยกเลิกรายการ</button>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {
                        this.state.order === "h" || 
                        <React.Fragment>
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
                                    {x.map(n => n)}
                                </tbody>
                            </table>
                        </React.Fragment>
                    }
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