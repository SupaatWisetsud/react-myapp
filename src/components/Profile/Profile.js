import React from 'react';
import { decode } from 'jsonwebtoken';

class Profile extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            loading : false
        }
    }

    componentDidMount(){
        const {username, firstName, lastName, email, phone} = decode(localStorage.getItem('token'))._doc;
        this.setState({
            username,
            firstName,
            lastName,
            email,
            phone
        });
        
    }

    render(){
        return(
            <React.Fragment>
                <div className="title">
                    <div className="items-title">
                        <h2>
                        <i className="fas fa-edit"></i> แก้ไขโปรไฟล์ตัวเอง
                        </h2>
                    </div>
                </div>
                <div className="profile">
                    <form className="form-edit-profile">
                        <div className="edit-profile">
                            <input type="text" placeholder="Username" defaultValue={this.state.username} onChange={null} />
                        </div>
                        <div className="name">
                            <div>
                                <input type="text" placeholder="Frist name" defaultValue={this.state.firstName} onChange={null} />
                            </div>
                            <div>
                                <input type="text" placeholder="Last name" defaultValue={this.state.lastName} onChange={null} />
                            </div>
                        </div>
                        <div className="edit-profile">
                            <input type="text" placeholder="Email" defaultValue={this.state.email} onChange={null} />
                        </div>
                        <div className="edit-profile">
                            <input type="number" placeholder="Phone" defaultValue={this.state.phone} onChange={null} />
                        </div>
                        <div className="edit-profile">
                            <button>ยืนยัน</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;