import React from 'react';
import axios from 'axios';

import {AddCategory,TableCategory,TitleBtnCategory,TitleCategory} from './SubCategory';

const endpoint = "http://localhost:4000/api";

class CarCategory extends React.Component{

    state = { 
        data: [],
        loading : false,
        statusAddCategory : false,
        name : '',
        price : '',
        file : ''
    };

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
    
    addCategory = () => {
        this.setState({
            statusAddCategory : !this.state.statusAddCategory
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

    submitAddCategory = async e => {
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
            return <div className="isloading"><i className="fas fa-spinner"/>Loading...</div> 
        }
        else{
            return (
                <React.Fragment>
                    <div className="title">
                        <TitleCategory val="รายการประเภทของรถ" />
                        <TitleBtnCategory 
                        addCategory={this.addCategory} 
                        statusAddCategory={this.state.statusAddCategory} />
                    </div>

                    {this.state.statusAddCategory && 
                    <AddCategory 
                    submitAddCategory={this.submitAddCategory} 
                    setFile={this.setFile} 
                    setName={this.setName} 
                    setPrice={this.setPrice}  />}

                    <div>
                        <TableCategory data={this.state.data} deleteProduct={this.deleteProduct}/>
                    </div>
                </React.Fragment>
            );
        }
    }
}


export default CarCategory;