import React from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home.jsx';
import Profile from '../components/Profile.jsx';

function Content(props){

    const { menu } = props;
    if(menu === "home"){
        return <Home />;
    }else if(menu === "profile"){
        return <Profile />
    }
}

const mapStateStore = (state) => {
    return {
        menu : state
    };
}

export default connect(mapStateStore)(Content);