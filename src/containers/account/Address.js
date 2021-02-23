import React from 'react';
import { withRouter } from 'react-router-dom';



function Address(props) {
    console.log("props of component: Address")
    console.log(props);

    return (
        <div>
            <h4>Address</h4>
        </div>
    );
}




export default withRouter(Address);