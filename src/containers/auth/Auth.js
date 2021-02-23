import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import BsCore2 from '../../bs-library/helpers/BsCore2';

class Auth extends React.Component {

    state = {
        email: "",
        password: "",
        isLoggedIn: (BsAppSession.isLoggedIn() ? true : false)
    };

    componentDidMount() {
        Bs.log("\n\n#################################");
        Bs.log("In CLASS: Auth, METHOD: componentDidMount()");
    }



    onCredentialChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // if (name === "email") {
        //     BsAppSession.set("email", value);
        // }

        this.setState({
            [name]: value
        });
    }



    onLogout = (e) => {
        e.preventDefault();
        const userEmail = BsAppSession.get("email");
        BsAppSession.clear();
        BsAppSession.set("email", userEmail);
        BsAppSession.set("isLoggedIn", 0);

        this.setState({ isLoggedIn: false });
    };



    onLogin = (e) => {
        e.preventDefault();

        BsCore2.ajaxCrud({
            url: '/join/login',
            method: "post",
            params: { email: this.state.email, password: this.state.password },
            neededResponseParams: ["userId", "email", "apiToken", "isResultOk"],
            callBackFunc: (requestData, json) => {

                Bs.log("\n#####################");
                Bs.log("CLASS: Auth, METHOD: onLogin() => ajaxCrud() => callBackFunc()");

                if (json.isResultOk) {
                    BsAppSession.set("userId", json.userId);
                    BsAppSession.set("email", json.email);
                    BsAppSession.set("apiToken", json.apiToken);
                    BsAppSession.set("isLoggedIn", 1);

                    this.setState({ isLoggedIn: true });

                    alert("Welcome!");
                }
                else {
                    alert("unsuccessful");
                }
            },
            errorCallBackFunc: (errors) => {
                alert("sorry, unsuccessful");
            }
        });
    };



    render() {

        if (this.state.isLoggedIn) {
            return (
                <form>
                    <h1>Hooooraayy! You're now logged-in!</h1>
                    <button type="button" className="btn btn-primary" onClick={this.onLogout}>logout</button>
                </form>
            );
        }



        return (
            <form>
                <h1>Auth</h1>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" value={this.state.email} onChange={this.onCredentialChanged} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" value={this.state.password} onChange={this.onCredentialChanged} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button type="button" className="btn btn-primary" onClick={this.onLogin}>login</button>
            </form>
        );
    }
}


export default Auth;