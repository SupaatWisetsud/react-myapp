import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Logout(props){

    localStorage.removeItem('token');

    React.useEffect(()=>{
        props.dispatch({
            type : "reset",
            data : []
        });
        props.dispatch({
            type : "menu",
            data : "home"
        });
    })

    return(<Redirect to="/login" />);
}

const mapStateStore = (state) => {
    return {
        basket : state.basketReducer,
        menu : state.menuReducer
    };
}

export default connect(mapStateStore)(Logout);