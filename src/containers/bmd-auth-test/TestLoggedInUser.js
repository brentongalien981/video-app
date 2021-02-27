import React from 'react';
import BsAppStorage from '../../bs-library/helpers/BsAppStorage';
import BsCore2 from '../../bs-library/helpers/BsCore2';

class TestLoggedInUser extends React.Component {

    state = {
        username: '',
        email: '',
    };



    getUserInfo = (provider) => {
        
        BsCore2.ajaxCrud({
            url: '/passport/get-user-info',
            method: 'post',
            params: { bmdToken: BsAppStorage.get('accessToken') },
            callBackFunc: (requestData, json) => {
                const refreshedState = {
                    username: json.objs.username,
                    email: json.objs.email,
                    loginMsg: json.objs.msg,
                };

                this.setState({ ...refreshedState });
            },
        });
    };



    getHttpInfo = () => {
        
        BsCore2.ajaxCrud({
            url: '/test/get-http-info',
            callBackFunc: (requestData, json) => {
            },
        });
    };



    render() {
        return (
            <div>
                <h2>FILE: TestLoggedInUser.js</h2>
                <h5>username: {this.state.username}</h5>
                <h5>email: {this.state.email}</h5>
                <button onClick={this.getUserInfo}>get-user-info</button><br />
                <button onClick={this.getHttpInfo}>get-http-info</button>
            </div>
        );
    }

}


export default TestLoggedInUser;