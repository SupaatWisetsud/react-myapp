import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Content from './Content';
import { connect } from 'react-redux';

import Menu from './Menu';

const viewRoot = ({menu, dispatch}) => {
    //หน้าหลักที่จะเรียก menu และ content

    const onClickEvent = (page) => {
        dispatch({
            type : "menu",
            payload : page
        });
    }

    if(!localStorage.getItem('token')){
        return <Redirect to="/login" />
    }

    return(
        <div className="container-index">
            <Menu onClickEvent={onClickEvent} menu={menu}/>
            <div className="content">
                <div className="header">
                    <Link to="/logout" id="logout">
                        <i className="fas fa-sign-out-alt"/> ออกจากระบบ
                    </Link>
                </div>
                <div className="sub-content">
                    <Content menu={menu} />
                </div>
            </div>
        </div>
    );
}


const mapStateStore = (state) => {
    return {
        menu : state.menuReducer
    };
}
export default connect(mapStateStore)(viewRoot);