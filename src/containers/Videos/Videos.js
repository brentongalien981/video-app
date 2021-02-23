import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as videoActions from '../../actions/video';

class Videos extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            message: "Please disregard the COVID-19 hoax.",
            shouldRedirect: false
        };

        //
        this.handleOnRedirect = this.handleOnRedirect.bind(this);
    }

    handleOnRedirect() {
        this.setState({ shouldRedirect: true });
    }



    componentDidMount() {
        console.log("\n######################");
        console.log("CLASS: Video, METHOD: componentDidMount()");
        console.log("this.props.message ==> " + this.props.message);
        console.log("this.props ==> ...");
        console.log(this.props);

        const videoId = this.props.match.params.id;
        console.log("\n######################");
        console.log("videoId ==> " + videoId);

        this.props.readVideo(videoId);
    }



    render() {

        const videos = this.props.videos.map((video, i) => {
            return (
                <div key={i}>
                    <Link to={"/videos/" + video.id}>{video.title}</Link>
                </div>
            );
        });

        let redirect = (
            <button onClick={this.handleOnRedirect}>redirect</button>
        );
        if (this.state.shouldRedirect) { redirect = (<Redirect to="/home" />); }

        return (
            <div>
                <h5>FILE: Videos.js</h5>
                {videos}
                <button onClick={this.props.onVideoSave}>save video</button>
                <button onClick={this.props.deleteVideo}>delete video</button>

                <div>
                    <h5>Rendered Video</h5>
                    <h4>Title:: {this.props.renderedVideo?.title}</h4>
                </div>

                <div>
                    <h2>Products</h2>
                    <button onClick={this.props.readProducts}>read products</button>
                    {this.props.products}
                </div>

                <div>
                    <h3 style={{ color: "red" }}>COMMENT:: {this.props.message}</h3>
                </div>

                <br />
                {redirect}
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        message: state.message,
        videos: state.videos,
        renderedVideo: state.renderedVideo,
        videoId: state.videoId,
        products: state.products
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        onVideoSave: () => dispatch({ type: 'SAVE_VIDEO' }),
        deleteVideo: () => dispatch({ type: 'DELETE_VIDEO' }),
        readVideo: (videoId) => dispatch(videoActions.readVideo(videoId)),
        readProducts: () => dispatch(videoActions.readProducts())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Videos));