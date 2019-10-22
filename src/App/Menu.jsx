import React from 'react';
import { connect } from 'react-redux';
import { decode } from 'jsonwebtoken';

function Menu(props) {
    
    const data = [
        {
            icon : "fas fa-home",
            name : "home",
            display : "หน้าหลัก",
            status : "u"
        },
        {
            icon : "fas fa-id-badge",
            name : "profile",
            display : "จัดการโปรไฟล์",
            status : "u"
        },
        // {
        //     icon : "fas fa-key",
        //     name : "password",
        //     display : "แก้ไขรหัสผ่าน",
        //     status : "u"
        // },
        {
            icon : "fas fa-user-friends",
            name : "emp",
            display : "จัดการพนักงาน",
            status : "a"
        },
        {
            icon : "fas fa-cart-arrow-down",
            name : "product",
            display : "จัดการประเภทรถ",
            status : "a"
        }
    ]
    const onClickEvent = (page) => {
        
        props.dispatch({
            type : "menu",
            payload : page
        });
    }

    const { _doc : user } = decode(localStorage.getItem('token'));
    const { status, firstName, lastName, profileImg, username } = user;
    
    return (
        <div className="menu menu-show">
            <div className="logo">
                <h1>
                    Car ca
                </h1>
            </div>
            <div className="status">
                <p>
                    สถานะ : { status === "a"? "ผู้ดูแล":"พนักงานทั่วไป" }
                </p>
            </div>
            <div className="profile">
                <img src={"http://localhost:4000"+profileImg} alt={username} style={status === "a"? {border :"3px solid #AF7AC5"}:{border :"3px solid #85C1E9"}} />
                <p>คุณ : {firstName} {lastName}</p>
            </div>
            <ul className="select-menu">
                {data.map((n, index) => {
                    if(status === "a"){
                        return <li key={index} onClick={ e => onClickEvent(n.name)} style={props.menu === n.name? {backgroundColor:"#5499C7"}:{}} >
                                    <i className={n.icon} />
                                    <p>{n.display}</p>
                                </li>
                    }else{
                        if(n.status === "u"){
                            return <li key={index} onClick={ e => onClickEvent(n.name)} style={props.menu === n.name? {backgroundColor:"#5499C7"}:{}} >
                                        <i className={n.icon} />
                                        <p>{n.display}</p>
                                    </li>
                        }
                    }
                } )}
            </ul>
        </div>    
    );
}

const mapStateStore = (state) => {
    return {
        menu : state.menuReducer
    };
}
export default connect(mapStateStore)(Menu);