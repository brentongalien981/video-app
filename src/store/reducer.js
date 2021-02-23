import * as videoActions from '../actions/video';



const initialState = {
    message: "This is the initial state.",
    videos: [
        { id: 1, title: "video1" },
        { id: 2, title: "video2" },
        { id: 3, title: "video3" }
    ],
    renderedVideo: {},
    videoId: 0,
    products: []
};



const readVideo = (state, action) => {
    let selectedVideo = state.videos[action.videoId - 1];

    return {
        ...state,
        renderedVideo: selectedVideo
    };
};



const readProducts = (state, action) => {
    return {...state, message: "just read some products!"};
};



const ajaxReadProducts = (state, action) => {
    return {...state, message: "just AJAX read some products!"};
};



const reducer = (state = initialState, action) => {

    let updatedVideos;

    switch (action.type) {
        case 'SAVE_VIDEO':
            console.log("Handler 'SAVE_VIDEO' dispatched!");
            return {
                ...state,
                message: "Handler 'SAVE_VIDEO' dispatched!"
            };

        case 'DELETE_VIDEO':
            return { ...state, message: "Handler 'DELETE_VIDEO' dispatched!" };

        case videoActions.READ_VIDEO: return readVideo(state, action);
        case 'CREATE_VIDEO':
            console.log("DISPATCHED:: CREATE_VIDEO");
            console.log("action.video ==> ...");
            console.log(action.video);

            let newVideoId = state.videos.length + 1;
            let newVideo = {
                id: newVideoId,
                title: action.video.title
            };
            updatedVideos = [...state.videos, newVideo];

            console.log("newVideo ==> ...");
            console.log(newVideo);

            console.log("updatedVideos ==> ...");
            console.log(updatedVideos);

            return { ...state, videos: updatedVideos };

        case videoActions.READ_PRODUCTS: return readProducts(state, action);
        case videoActions.AJAX_READ_PRODUCTS: return ajaxReadProducts(state, action);

        default:
            return state;
    }
}


export default reducer;