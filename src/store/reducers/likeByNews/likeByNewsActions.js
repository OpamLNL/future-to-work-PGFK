import axios from 'axios';
import { apiBaseURL, urls } from "../../../configs/urls";
import {
    ADD_LIKE_REQUEST,
    ADD_LIKE_SUCCESS,
    ADD_LIKE_FAILURE,
    REMOVE_LIKE_REQUEST,
    REMOVE_LIKE_SUCCESS,
    REMOVE_LIKE_FAILURE
} from './likeByNewsTypes';

const addLike = (newsId, userId) => {
    return async (dispatch) => {
        dispatch({ type: ADD_LIKE_REQUEST });

        try {
            const response = await axios.post(`${apiBaseURL}${urls.likes.add}`, { newsId, userId });
            dispatch({ type: ADD_LIKE_SUCCESS, payload: response.data });
        } catch (error) {
            console.error('Error adding like:', error);
            dispatch({ type: ADD_LIKE_FAILURE, payload: error.message });
        }
    };
};

const removeLike = (likeId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_LIKE_REQUEST });

        try {
            const response = await axios.delete(`${apiBaseURL}${urls.likes.remove}/${likeId}`);
            dispatch({ type: REMOVE_LIKE_SUCCESS, payload: likeId });
        } catch (error) {
            console.error('Error removing like:', error);
            dispatch({ type: REMOVE_LIKE_FAILURE, payload: error.message });
        }
    };
};

export { addLike, removeLike };
