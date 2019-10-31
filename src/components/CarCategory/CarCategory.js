import React from 'react';
import axios from 'axios';

const endpoint = "http://localhost:4000/api";

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            data: [],
            loading : false,
            addProduct : false,
            name : '',
            price : '',
            file : ''
        };
        this.addProduct = this.addProduct.bind(this);
        this.submitAddProduct = this.submitAddProduct.bind(this);
        this.setName = this.setName.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setFile = this.setFile.bind(this);
    }

    async componentDidMount(){
        this.setState({
            loading : true
        });
        await axios.get(endpoint + "/product").then(res => {
            this.setState({
                data : res.data.result,
                loading : false
            });
        });
    }
    
    addProduct = () => {
        this.setState({
            addProduct : !this.state.addProduct
        });  
    }

    deleteProduct = async id => {
        this.setState({
            loading : true
        });
        let { data } = await axios.delete(endpoint +"/product", { data : {id} });
        
        if(data.success){
            
            this.setState({
                data : []
            })
            await axios.get(endpoint + "/product").then(res => {
                this.setState({
                    data : res.data.result,
                    loading : false
                });
            }); 
        }
    }

    submitAddProduct = async e => {
        e.preventDefault();

        this.setState({
            loading : true
        });

        let fd = new FormData();

        fd.append("name", this.state.name);
        fd.append("price", this.state.price);
        fd.append("file", this.state.file);
        
        await axios.post(endpoint +"/product", fd);

        await axios.get(endpoint + "/product").then(res => {
            this.setState({
                data : res.data.result,
                loading : false,
                name : '',
                price : '',
                file : '',
                addProduct : false
            });
        });
    }

    setName = event => {
        this.setState({
            name : event.target.value
        });
    }
    setPrice = event => {
        this.setState({
            price : event.target.value
        });
    }
    setFile = event => {
        this.setState({
            file : event.target.files[0]
        });
    }

    render(){
        
        if(this.state.loading){
            return <div style={{
                width : "100%",
                height : "100%",
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                fontSize : 24,
                color : "#333333"
            }}><i className="fas fa-spinner"/>Loading...</div> 
        }
        else{
            return (
                <React.Fragment>
                    <div className="title">
                        <div className="items-title-product">
                            <h1>
                                รายการประเภทของรถ
                            </h1>
                        </div>
                        <div className="items-title-btn">
                            <button className="add-product" onClick={this.addProduct}>
                                {!this.state.addProduct? "เพิ่มประเภท" : "ยกเลิกการเพิ่มประเภท"}
                            </button>
                        </div>
                    </div>
                    {
                        this.state.addProduct && 
                        <form className="add-product" onSubmit={this.submitAddProduct} >
                            <input type="text" placeholder="Name car" onChange={ this.setName } />
                            <input type="number" placeholder="Price car" onChange={ this.setPrice } />
                            <input type="file" onChange={ this.setFile } />
                            <button type="submit">เพิ่มสินค้า</button>
                        </form>
                    }
                    <div className="table-product">
                        <table>
                            <thead>
                                <tr>
                                    <th>ชื่อ</th>
                                    <th>ราคา</th>
                                    <th>รูป</th>
                                    <th>แก้ไข</th>
                                    <th>ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((n, index) => {
                                    return (
                                        <tr key={index} style={(index % 2)? {backgroundColor : "#FFF"} : {backgroundColor : "#EBF5FB"}}>
                                            <td>
                                                {n.name}
                                            </td>
                                            <td>
                                                {n.price}
                                            </td>
                                            <td>
                                                <img src={"http://localhost:4000" + n.image} alt={n.name} style={{width:100,height:60}}/>
                                            </td>
                                            <td>
                                                <button className="edit">แก้ไข</button>
                                            </td>
                                            <td>
                                                <button className="delete" onClick={ e => this.deleteProduct(n._id) } >ลบ</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            );
        }
    }
    
}


export default Product;