import React from 'react';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import BsAppStorage from '../../bs-library/helpers/BsAppStorage';

class SuccessSignup extends React.Component {

    componentDidMount() {
        Bs.log('this.props.history ==> ...');
        Bs.log(this.props.history);

        const urlParams = this.props.history.location.search;
        const acceptedParamKeys = [
            'accessToken',
            'refreshToken',
            'expiresIn',
            'authProviderId',
        ];

        const parsedParams = Bs.getParsedQueryParams(urlParams, acceptedParamKeys);

        Bs.log('parsedParams ==> ...');
        Bs.log(parsedParams);

        BsAppStorage.set('accessToken', parsedParams['accessToken']);
        BsAppStorage.set('authProviderId', parsedParams['authProviderId']);
    }



    render() {
        return (
            <div>
                <h2>FILE: SuccessSignup.js</h2>
            </div>
        );
    }
}



export default withRouter(SuccessSignup);


