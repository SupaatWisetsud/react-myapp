import React from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home/Home.jsx';
import Profile from '../components/Profile/Profile.jsx';
import Product from '../components/Product/Product.jsx';
import Emp from '../components/Emp/Emp.jsx';

function Content(props){

    const { menu } = props;
    
    if(menu === "home"){
        return <Home />;
    }else if(menu === "profile"){
        return <Profile />
    }else if(menu === "product"){
        return <Product />
    }else if(menu === "emp"){
        return <Emp />
    }
}

const mapStateStore = (state) => {
    return {
        menu : state.menuReducer
    };
}

export default connect(mapStateStore)(Content);