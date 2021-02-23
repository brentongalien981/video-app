import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import BsCore2 from '../../bs-library/helpers/BsCore2';

class BmdAuthTest extends React.Component {

    state = {
        accessToken: 'n/a',
    };

    render() {
        return (
            <div>
                <h3>Bmd Auth Test</h3>
                <hr /><br /><br />

                <div>
                    <h4>Test Sign-up</h4>
                    <p>Access Token: {this.state.accessToken}</p>
                    {/* <input type="text" /> */}
                    <button>sign-up</button>
                </div>
            </div>
        );
    }
}


export default BmdAuthTest;