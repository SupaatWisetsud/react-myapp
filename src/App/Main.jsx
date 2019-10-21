import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Content from './Content.jsx';
import Menu from '../components/Menu.jsx';

export default function Main(props){

    return(
        <div className="container-index">
            
            {!localStorage.getItem('token') && <Redirect to="/login" />}

            <Menu />
            <div className="content">
                <div className="header">
                    <i className="fas fa-bars bar"></i>
                    <Link to="/logout" id="logout">ออกจากระบบ</Link>
                </div>
                <div className="sub-content">
                    <Content />
                </div>
            </div>
            
        </div>
    );
}