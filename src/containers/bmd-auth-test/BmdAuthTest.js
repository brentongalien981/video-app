import React from 'react';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import BsAppStorage from '../../bs-library/helpers/BsAppStorage';
import BsCore2 from '../../bs-library/helpers/BsCore2';

class BmdAuthTest extends React.Component {

    state = {
        accessToken: 'n/a',
        username: '',
        email: '',
        password: '',
        loginMsg: '',
    };



    onCredentialChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }




    onSignup = () => {

        BsCore2.ajaxCrud({
            url: '/passport/signup-for-token',
            method: 'post',
            params: { username: this.state.username, email: this.state.email, password: this.state.password },
            callBackFunc: (requestData, json) => {

                let url = '/success-signup';
                url += '?accessToken=' + json.objs.access_token;
                url += '&authProviderId=' + json.objs.authProviderId;

                this.props.history.push(url);
            },
        });
    };




    onLogin = (provider) => {

        switch (provider) {
            case 'facebook':
                window.location.replace('https://asbdev.com/test-socialite/auth-providers?provider=facebook');
                return;
            case 'google':
                window.location.replace('https://asbdev.com/test-socialite/auth-providers?provider=google');
                return;
        }



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



    render() {
        return (
            <div>
                <h3>Bmd Auth Test</h3>
                <hr /><br /><br />

                <div>
                    <h4>Test Sign-up</h4>
                    <input
                        name="username"
                        value={this.state.username}
                        onChange={this.onCredentialChanged}
                        type="text"
                    /><br />
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onCredentialChanged}
                        type="email"
                    /><br />
                    <input
                        name="password"
                        value={this.state.password}
                        onChange={this.onCredentialChanged}
                        type="password"
                    /><br />
                    <button onClick={this.onSignup}>sign-up</button>

                    <h4>- OR -</h4>
                    <h5>Login through</h5>
                    <button onClick={() => this.onLogin('facebook')}>facebook</button>
                    <button onClick={() => this.onLogin('google')}>google</button>
                </div>



                <hr /><br /><br />

                <div>
                    <h4>Test Token</h4>
                    <h5>username: {this.state.username}</h5>
                    <h5>email: {this.state.email}</h5>
                    <h6>login-msg: {this.state.loginMsg}</h6>
                    <button onClick={this.onLogin}>login</button>
                </div>
            </div>
        );
    }
}


export default withRouter(BmdAuthTest);