//commentsActions.js
import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE
} from './commentsTypes';

export const fetchCommentsRequest = () => ({ type: FETCH_COMMENTS_REQUEST });
export const fetchCommentsSuccess = (comments) => ({ type: FETCH_COMMENTS_SUCCESS, payload: comments });
export const fetchCommentsFailure = (error) => ({ type: FETCH_COMMENTS_FAILURE, payload: error });