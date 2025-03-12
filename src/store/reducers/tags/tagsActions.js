// tagsActions.js
import {
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_FAILURE
} from './tagsTypes';
import axios from 'axios';

export const fetchTagsRequest = () => ({ type: FETCH_TAGS_REQUEST });
export const fetchTagsSuccess = (tags) => ({ type: FETCH_TAGS_SUCCESS, payload: tags });
export const fetchTagsFailure = (error) => ({ type: FETCH_TAGS_FAILURE, payload: error });

// Thunk action для завантаження тегів
export const fetchTags = () => {
    return async (dispatch) => {
        dispatch(fetchTagsRequest());
        try {
            // Визначте URL вашого API для отримання тегів
            const response = await axios.get('/api/tags');
            dispatch(fetchTagsSuccess(response.data));
        } catch (error) {
            dispatch(fetchTagsFailure(error.message));
        }
    };
};
