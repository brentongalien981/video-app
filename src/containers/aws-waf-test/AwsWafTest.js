import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import BsCore2 from '../../bs-library/helpers/BsCore2';

class AwsWafTest extends React.Component {

    static intervalHandler = null;
    static throttleIntervalHandler = null;
    static webPageTimerIntervalHandler = null;


    state = {
        requestDispatched: 0,
        requestReceivedBack: 0,
        requestReceivedBackWithError: 0,
        webPageTime: 0,
    };

    testApiRoute = () => {

        Bs.log("METHOD testApiRoute() called ...");

        BsCore2.ajaxCrud({
            url: '/test-waf/testDdos',
            callBackFunc: (requestData, json) => {
                Bs.log("URL: /test-api-route");

                const updatedRequestReceivedBack = this.state.requestReceivedBack + 1;

                this.setState({
                    requestReceivedBack: updatedRequestReceivedBack
                });
            },
            errorCallBackFunc: (errors) => {
                const updatedRequestReceivedBack = this.state.requestReceivedBackWithError + 1;

                this.setState({
                    requestReceivedBackWithError: updatedRequestReceivedBack
                });
            },
        });


        const updatedRequestDispatched = this.state.requestDispatched + 1;

        this.setState({
            requestDispatched: updatedRequestDispatched
        });

    };



    requestRepeatedly = () => {
        AwsWafTest.intervalHandler = setInterval(this.testApiRoute, 3000);

    };



    stopRepeatedRequest = () => {
        clearInterval(AwsWafTest.intervalHandler);
    };



    setWebPageTimer = () => {
        AwsWafTest.webPageTimerIntervalHandler = setInterval(() => {
            const updatedTime = this.state.webPageTime + 1;
            this.setState({ webPageTime: updatedTime });
        }, 1000);
    };



    stopWebPageTimer = () => {
        clearInterval(AwsWafTest.webPageTimerIntervalHandler);
    };



    testThrottle = () => {

        AwsWafTest.throttleIntervalHandler = setInterval(() => {

            Bs.log("METHOD testThrottle() called ...");

            BsCore2.ajaxCrud({
                url: '/test-waf/test-max-30-request',
                callBackFunc: (requestData, json) => {

                    const updatedRequestReceivedBack = this.state.requestReceivedBack + 1;

                    this.setState({
                        requestReceivedBack: updatedRequestReceivedBack
                    });
                },
                errorCallBackFunc: (errors) => {
                    const updatedRequestReceivedBack = this.state.requestReceivedBackWithError + 1;

                    this.setState({
                        requestReceivedBackWithError: updatedRequestReceivedBack
                    });
                },
            });


            const updatedRequestDispatched = this.state.requestDispatched + 1;

            this.setState({
                requestDispatched: updatedRequestDispatched
            });

        }, 500);
    };



    stopTestThrottle = () => {
        clearInterval(AwsWafTest.throttleIntervalHandler);
    };



    render() {
        return (
            <div>
                <h3>AWS WAF Test</h3>

                <div>
                    <h4>Stats</h4>

                    <div>
                        <h5>{"Time: " + this.state.webPageTime}</h5>
                        <button onClick={this.setWebPageTimer} style={{ backgroundColor: 'green' }}>start</button>
                        <button onClick={this.stopWebPageTimer} style={{ backgroundColor: 'red' }}>stop</button><br />
                        <hr />
                    </div>

                    <h5>{"Request Dispatched: " + this.state.requestDispatched}</h5>
                    <h5>{"Request Received Back: " + this.state.requestReceivedBack}</h5>
                    <h5>{"Request Received Back with Error: " + this.state.requestReceivedBackWithError}</h5>
                </div>

                <div>
                    <button onClick={this.testApiRoute}>test-api-route</button><br />
                    <button onClick={this.requestRepeatedly}>request-repeatedly</button><br />

                    <button onClick={this.stopRepeatedRequest}>stop-repeated-request</button><br />

                    <button onClick={this.testThrottle}>test-30-max-request-throttle</button>
                    <button onClick={this.stopTestThrottle} style={{ backgroundColor: 'red' }}>stop-test-throttle</button><br />
                </div>
            </div>
        );
    }
}


export default AwsWafTest;