import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import * as actions from '../../actions/video';



class CreateVideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            video: {},
            shouldRedirect: false
        };
    }



    handleOnVideoTitleChange = (e) => {
        let updatedVideo = this.state.video;
        updatedVideo.title = e.target.value;

        this.setState({
            video: updatedVideo
        });
    }



    handleOnRedirect = () => {
        console.log("###################");
        console.log("this.props ==> ...");
        console.log(this.props);
        this.props.history.replace("/videos");
        // this.setState({ shouldRedirect: true });

        
    }



    render() {

        const videos = this.props.videos.map((video, i) => {
            return (
                <div key={i}>
                    <Link to={"/videos/" + video.id}>{video.title}</Link>
                </div>
            );
        });

        let redirect = (<button onClick={this.handleOnRedirect}>redirect</button>);
        if (this.state.shouldRedirect) { redirect = (<Redirect to="/videos" />); }


        return (
            <div>

                <h2>Welcome! Create your Video...</h2>

                <div>
                    <label>Title</label>
                    <input onChange={(e) => { this.handleOnVideoTitleChange(e) }}></input>
                    <br />
                    <button onClick={() => { this.props.createVideo(this.state.video) }}>submit</button>
                </div>

                <div>
                    <h3>Current Videos</h3>
                    {videos}
                </div>

                <div>{redirect}</div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        videos: state.videos
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        createVideo: (video) => dispatch(actions.createVideo(video))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateVideo));