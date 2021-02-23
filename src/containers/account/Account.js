import React from 'react';
import Address from './Address';

class Account extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            message: "FILE: Account.js"
        };
    }



    componentDidMount() {
        console.log(this.props);
    }



    render() {
        return (
            <div>
                <h3>Welcome to Your Account</h3>
                <Address />
            </div>
        );
    }
}


export default Account;