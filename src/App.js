import React, { Suspense } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './App.css';
import Videos from './containers/Videos/Videos';
import Account from './containers/account/Account';
import Auth from './containers/auth/Auth';
import AwsWafTest from './containers/aws-waf-test/AwsWafTest';
import BmdAuthTest from './containers/bmd-auth-test/BmdAuthTest';
// import CreateVideo from './containers/Videos/CreateVideo';

const CreateVideo = React.lazy(() => import('./containers/Videos/CreateVideo'));



function App() {

    const searchLinkObj = {
        pathname: "/search",
        search: "?q=test+search+phrase"
    };

    const homeLinkhObj = {
        pathname: "/",
        hash: "#latest-products"
    };

    return (
        // <BrowserRouter basename="/">
        <BrowserRouter>
            <div id="links">
                <NavLink to="/" activeClassName="appActiveLink">Home</NavLink><br />
                <NavLink to="/videos" activeClassName="appActiveLink">Videos</NavLink><br />
                <NavLink to="/video/create" activeClassName="appActiveLink">Create Video</NavLink><br />
                <NavLink to="/account" activeClassName="appActiveLink">Account</NavLink><br />
                <NavLink to="/auth" activeClassName="appActiveLink">Auth</NavLink><br />

                <NavLink to="/waf" activeClassName="appActiveLink">AWS WAF Test</NavLink><br />
                <NavLink to="/bmd-auth-test" activeClassName="appActiveLink">BMD Auth Testt</NavLink><br />

                <br />

                <NavLink to={searchLinkObj}>NavLink with search-phrase</NavLink><br />
                <NavLink to={homeLinkhObj}>NavLink with hash</NavLink><br />
            </div>



            <Route path="/video/create" exact render={() => <Suspense fallback={<div>loading...</div>}><CreateVideo /></Suspense>} />
            <Route path="/videos" exact render={() => <Videos />} />
            <Route path="/videos/:id" exact render={() => <Videos />} />

            <Route path="/auth" exact component={Auth} />
            <Route path="/bmd-auth-test" exact component={BmdAuthTest} />

            <Route path="/waf" exact component={AwsWafTest} />

            <Route path="/account" exact component={Account} />
            <Route path="/search" exact render={() => getSearchComponent()} />
            <Route path="/" exact render={() => <h3>Welcome Home</h3>} />
            {/* <Redirect from="/home" to="/" /> */}
        </BrowserRouter>
    );
}



function getSearchComponent() {
    return (
        <div>
            <h3>Search</h3>
            <ul>
                <li>test search-result1</li>
                <li>test search-result2</li>
                <li>test search-result3</li>
            </ul>
        </div>
    );
}


export default App;
