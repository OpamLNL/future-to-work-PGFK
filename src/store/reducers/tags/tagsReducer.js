//tagsReducer.js
import {
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_FAILURE
} from './tagsTypes';

const initialState = {
    tags: [],
    loading: false,
    error: null
};

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TAGS_REQUEST:
            return { ...state, loading: true };
        case FETCH_TAGS_SUCCESS:
            return { ...state, loading: false, tags: action.payload };
        case FETCH_TAGS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};