export const SAVE_VIDEO = "SAVE_VIDEO";
export const CREATE_VIDEO = "CREATE_VIDEO";
export const READ_VIDEO = "READ_VIDEO";
export const UPDATE_VIDEO = "UPDATE_VIDEO";

export const AJAX_READ_PRODUCTS = "AJAX_READ_PRODUCTS";
export const READ_PRODUCTS = "READ_PRODUCTS";



export const saveVideo = () => ({
    type: SAVE_VIDEO
});
export const createVideo = (video) => ({ type: CREATE_VIDEO, video: video });
export const readVideo = (videoId) => ({ type: READ_VIDEO, videoId: videoId });
export const updateVideo = () => ({ type: UPDATE_VIDEO });

export const ajaxReadProducts = () => ({ type: AJAX_READ_PRODUCTS });
export const readProducts = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(ajaxReadProducts());
        }, 2000);
    };
};