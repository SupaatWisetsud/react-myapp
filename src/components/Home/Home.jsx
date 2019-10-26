import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import ReactToPrint from "react-to-print";

import Basket from './Basket.jsx';
import Bill from './Bill.jsx';

const endpoint = "http://localhost:4000/api";

class Home extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { 
            data: [],
            loading : false,
            error : {
                status : false,
                message : ''
            },
            order : "h",
            dataOrder : [],
            dateStart : '',
            dateEnd : '',
            dataPrint : {}
        };
        this.addProduct = this.addProduct.bind(this);
        this.confrimProduct = this.confrimProduct.bind(this);
        this.order = this.order.bind(this);
        this.changeDateStart = this.changeDateStart.bind(this);
        this.changeDateEnd = this.changeDateEnd.bind(this);
        this.seleteOrderDate = this.seleteOrderDate.bind(this);
        this.uploadStatus = this.uploadStatus.bind(this);
        this.reset = this.reset.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.setPrint = this.setPrint.bind(this);
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

    componentRef = React.createRef();

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
            this.setState({
                error : {
                    status : true,
                    message : "คุณไม่มีข้อมูลในรายการ!!"
                }
            });
        }
    }

    order = async e => {
        if(e === "h"){
            await axios.get(endpoint + "/order").then(res => {
                this.setState({
                    dataOrder : res.data.data,
                });
            });
            this.setState({
                order : e
            });
        }else{
            this.setState({
                order : e
            });
        }
    }

    changeDateStart = e => {
        this.setState({
            dateStart : e.target.value
        })
    }
    changeDateEnd = e => {
        this.setState({
            dateEnd : e.target.value
        })
    }

    seleteOrderDate = async e => {
        if(this.state.dateStart === '' || this.state.dateEnd === ''){
            this.setState({
                error : {
                    status : true,
                    message : "กรุณาใส่เวลาให้ครบ!!"
                }
            });
        }else{
            this.setState({
                loading : true
            });
    
            let dateStart = this.state.dateStart.split("-");
            let dateEnd = this.state.dateEnd.split("-");
            
            const data = {
                dateStart : {
                    y : Number.parseInt(dateStart[0]),
                    m : Number.parseInt(dateStart[1]) - 1,
                    d : Number.parseInt(dateStart[2])
                },
                dateEnd : {
                    y : Number.parseInt(dateEnd[0]),
                    m : Number.parseInt(dateEnd[1]) - 1,
                    d : Number.parseInt(dateEnd[2]) + 1
                }
            }
            
            await axios.post(endpoint + "/list-order", data).then(res => {
                this.setState({
                    dataOrder : res.data.data,
                    loading : false
                });
            });
        }
    }

    uploadStatus = async (id, status) => {
        this.setState({
            loading : true
        });
        await axios.put(endpoint + "/order", {id, status});

        if(this.state.dateStart === '' || this.state.dateStart === ''){
            await axios.get(endpoint + "/order").then(res => {
                this.setState({
                    dataOrder : res.data.data,
                    loading : false
                });
            });
        }else{
            let dateStart = this.state.dateStart.split("-");
            let dateEnd = this.state.dateEnd.split("-");
            
            const data = {
                dateStart : {
                    y : Number.parseInt(dateStart[0]),
                    m : Number.parseInt(dateStart[1]) - 1,
                    d : Number.parseInt(dateStart[2])
                },
                dateEnd : {
                    y : Number.parseInt(dateEnd[0]),
                    m : Number.parseInt(dateEnd[1]) - 1,
                    d : Number.parseInt(dateEnd[2]) + 1
                }
            }
            
            await axios.post(endpoint + "/list-order", data).then(res => {
                this.setState({
                    dataOrder : res.data.data,
                    loading : false
                });
            });
        }
    }

    reset = async () => {
        this.setState({
            loading : true
        });

        await axios.get(endpoint + "/order").then(res => {
            this.setState({
                dataOrder : res.data.data,
                loading : false
            });
        });
    }

    onDismiss = () => {
        this.setState({
            error : {
                status : false,
                message : ''
            }
        })
    }

    setPrint = n => {
        this.setState({
            dataPrint : n
        })
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
                        <td><Moment format="DD/MM/YYYY : HH:mm">{n.dateTime}</Moment></td>
                        <td>
                            {n.status === 'q' && <button className="que-btn" onClick={ e => this.uploadStatus(n._id, "s")} >รอคิวล้าง</button> }
                            {n.status === 's' && <button className="success-btn" onClick={ e => this.uploadStatus(n._id, "r")} >รอรับรถ</button> }
                            {n.status === 'r' && 
                                <div onClick={ e => this.setPrint(n)}>
                                    <ReactToPrint
                                        trigger={() => <button className="receive-btn" >พิมใบเสร็จ</button>}
                                        content={() => this.componentRef}
                                    />
                                </div>
                            }
                        </td>
                    </tr>
                );
            }
        })
        return(
            <React.Fragment>
                {
                    this.state.error.status && 
                    <div className="container-error">
                        <div className="flash">
                            {this.state.error.message}
                            <button className="close-popup" onClick={this.onDismiss}>X</button>
                        </div>
                    </div>
                }
                <div style={{display : "none"}}>
                    <Bill data={this.state.dataPrint} ref={el => (this.componentRef = el)} />
                </div>
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
                                <button style={{backgroundColor : "#D6EAF8"}} disabled >รายการรอคิวล้าง</button>
                                <button style={{backgroundColor : "#58D68D"}} onClick={ e => this.order("s")} >รานการล้างเสร็จแล้ว</button>
                                <button style={{backgroundColor : "#C39BD3"}} onClick={ e => this.order("r")} >รายการที่รับรถแล้ว</button>
                            </React.Fragment>
                        }
                        {
                            this.state.order === "s" && 
                            <React.Fragment>
                                <button style={{backgroundColor : "#5D6D7E"}} onClick={ e => this.order("h")} >หน้าหลัก</button>
                                <button style={{backgroundColor : "#85C1E9"}} onClick={ e => this.order("q")} >รายการรอคิวล้าง</button>
                                <button style={{backgroundColor : "#D5F5E3"}} disabled >รานการล้างเสร็จแล้ว</button>
                                <button style={{backgroundColor : "#C39BD3"}} onClick={ e => this.order("r")} >รายการที่รับรถแล้ว</button>
                            </React.Fragment>
                        }
                        {
                            this.state.order === "r" && 
                            <React.Fragment>
                                <button style={{backgroundColor : "#5D6D7E"}} onClick={ e => this.order("h")} >หน้าหลัก</button>
                                <button style={{backgroundColor : "#85C1E9"}} onClick={ e => this.order("q")} >รายการรอคิวล้าง</button>
                                <button style={{backgroundColor : "#58D68D"}} onClick={ e => this.order("s")} >รานการล้างเสร็จแล้ว</button>
                                <button style={{backgroundColor : "#E8DAEF"}} disabled >รายการที่รับรถแล้ว</button>
                            </React.Fragment>
                        }
                        
                    </div>
                </div>
                {
                    this.state.order === "h" || 
                    <div style={{
                        backgroundColor : "#D6EAF8",
                        padding : 10,
                        display : "flex",
                        justifyContent : "center",
                        marginTop : 10,
                        alignItems : "center",
                        border : "3px solid #5DADE2"
                    }}>
                        <p style={{marginRight : 5}}>ตั้งแต่วัน</p>
                        <input type="date" style={{borderRadius : 5, padding : 5, border : "none"}} onChange={this.changeDateStart} />
                        <p style={{margin : "0 10px"}}> ถึง </p>
                        <input type="date" style={{borderRadius : 5, padding : 5, border : "none"}} onChange={this.changeDateEnd} />
                        <button style={{
                            margin : "0 10px",
                            padding : 5, 
                            borderRadius : 5,
                            border : "none", 
                            backgroundColor : "#C39BD3",
                            color : "#FFF",
                            borderBottom : "3px solid #AF7AC5",
                            outline : "none",
                            cursor : "pointer"
                        }} onClick={this.seleteOrderDate} >
                            <i className="fas fa-search" style={{marginRight : 5}}></i>
                            ค้นหา
                        </button>
                        <button style={{
                            padding : 5, 
                            borderRadius : 5,
                            border : "none", 
                            backgroundColor : "#7DCEA0",
                            color : "#FFF",
                            borderBottom : "3px solid #229954",
                            outline : "none",
                            cursor : "pointer"
                        }} onClick={this.reset}>
                            <i className="fas fa-history" style={{marginRight : 5}}></i>
                            รีเซ็ต
                        </button>
                    </div>
                }
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
                            {
                                this.state.loading? 
                                <div className="list-product-loading"><i className="fas fa-spinner"/>Loading...</div>
                                : 
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
                            }
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