import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';


import {ItemsTitle,ItemsTitleBtn,ListCategory,SelectOrder,ListOrder,Basket,Bill} from './SubDashboard';
import { Alert } from '../Component';

const endpoint = "http://localhost:4000/api";

class Home extends React.Component {
    
    state = { 
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
    componentRef = React.createRef();
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
        return(
            <React.Fragment>
                <div style={{display : "none"}}>
                    <Bill data={this.state.dataPrint} ref={el => (this.componentRef = el)} />
                </div>
                {
                    this.state.error.status && 
                    <Alert onClick={this.onDismiss} message={this.state.error.message} color="danger" />
                }
                <div className="title">
                    <ItemsTitle order={this.state.order} />
                    <ItemsTitleBtn order={this.state.order} _order={this.order} />
                </div>
                {
                    this.state.order === "h" || 
                    <SelectOrder 
                    seleteOrderDate={this.seleteOrderDate} 
                    reset={this.reset} 
                    changeDateStart={this.changeDateStart} 
                    changeDateEnd={this.changeDateEnd} />
                }
                <div className="shop">
                    {
                        this.state.order === "h" && 
                        <React.Fragment>

                            <ListCategory 
                            data={this.state.data} 
                            loading={this.state.loading} 
                            addCategory={this.addProduct} />

                            <Basket 
                            basket={this.props.basket} 
                            confrimProduct={this.confrimProduct} 
                            dispatch={this.props.dispatch}
                            addProduct={this.addProduct}/>
                            
                        </React.Fragment>
                    }
                    {
                        this.state.order === "h" || 
                        <React.Fragment>
                            {
                                this.state.loading? 
                                <div className="list-product-loading"><i className="fas fa-spinner"/>Loading...</div>
                                : 
                                <ListOrder 
                                dataOrder={this.state.dataOrder} 
                                order={this.state.order} 
                                componentRef={this.componentRef} 
                                setPrint={this.setPrint}
                                uploadStatus={this.uploadStatus}/>
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