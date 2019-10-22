import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Logout(props){

    localStorage.removeItem('token');

    React.useEffect(()=>{
        props.dispatch({
            type : "reset",
            payload : []
        });
        props.dispatch({
            type : "menu",
            payload : "home"
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