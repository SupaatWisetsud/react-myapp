import React from 'react';

class Bill extends React.Component {

    render() {
        console.log(this.props.data);
        
        return (
            <React.Fragment>
                <h1>{this.props.data._id}</h1>
            </React.Fragment>
        );
    }
}

export default Bill;