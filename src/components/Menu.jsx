import React from 'react';
import { connect } from 'react-redux';
import { decode } from 'jsonwebtoken';

function Menu(props) {
    
    const onClickEvent = (page) => {
        props.dispatch({
            type : "menu",
            data : page
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
                <img src={"http://localhost:4000"+profileImg} alt={username} style={status === "a"? {border :"2px solid #AF7AC5"}:{border :"2px solid #85C1E9"}} />
                <p>คุณ : {firstName} {lastName}</p>
            </div>
            <ul className="select-menu">

                <li onClick={ e => onClickEvent("home")}>
                    <i className="fas fa-home" />
                    <p>หน้าหลัก</p>
                </li>
                <li onClick={ e => onClickEvent("profile")}>
                    <i className="fas fa-id-badge" />
                    <p>จัดการโปรไฟล์</p>
                </li>
                <li onClick={ e => onClickEvent("home")}>
                    <i className="fas fa-key" />
                    <p>แก้ไขรหัสผ่าน</p>
                </li>
                { 
                    status === "a" &&
                    <React.Fragment>
                        <li onClick={ e => onClickEvent("home")}>
                            <i className="fas fa-user-friends" />
                            <p>จัดการพนักงาน</p>
                        </li>
                        <li onClick={ e => onClickEvent("home")}>
                            <i className="fas fa-cart-arrow-down"/>
                            <p>จัดการสินค้า</p>
                        </li>
                        <li onClick={ e => onClickEvent("home")}>
                            <i className="far fa-calendar" />
                            <p>จัดการสถานะ</p>
                        </li>
                    </React.Fragment>
                }
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