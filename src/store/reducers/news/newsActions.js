import axios from 'axios';
import {
    apiBaseURL,
    urls
} from "../../../configs/urls";
import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE,
    UPDATE_NEWS_SUCCESS,
    UPDATE_NEWS_FAILURE,
    DELETE_NEWS_SUCCESS,
    DELETE_NEWS_FAILURE,
    CREATE_NEWS_REQUEST,
    CREATE_NEWS_SUCCESS,
    CREATE_NEWS_FAILURE
} from './newsTypes';

export const fetchNews = () => {
    return async (dispatch) => {
        dispatch(fetchNewsRequest());

        try {
            const response = await axios.get(`${apiBaseURL}${urls.news.getAll}`);
            dispatch(fetchNewsSuccess(response.data));
        } catch (error) {
            console.error('Error fetching news:', error);
            dispatch(fetchNewsFailure(error.message));
        }
    };
};

export const fetchNewsRequest = () => {
    return {
        type: FETCH_NEWS_REQUEST,
    };
};

export const fetchNewsSuccess = (news) => {
    return {
        type: FETCH_NEWS_SUCCESS,
        payload: [...news],
    };
};

export const fetchNewsFailure = (error) => {
    return {
        type: FETCH_NEWS_FAILURE,
        payload: error,
    };
};

const updateNewsSuccess = (updatedNews) => {
    return {
        type: UPDATE_NEWS_SUCCESS,
        payload: updatedNews,
    };
};

const updateNewsFailure = (error) => {
    return {
        type: UPDATE_NEWS_FAILURE,
        payload: error,
    };
};

const deleteNewsSuccess = (newsId) => {
    return {
        type: DELETE_NEWS_SUCCESS,
        payload: newsId,
    };
};

const deleteNewsFailure = (error) => {
    return {
        type: DELETE_NEWS_FAILURE,
        payload: error,
    };
};

export const updateNews = (updatedNews) => {
    return async (dispatch) => {
        try {
            const updatedNews = await axios.put(`${apiBaseURL}${urls.news.update}`, updatedNews);
            dispatch(updateNewsSuccess(updatedNews));
        } catch (error) {
            console.error('Error updating news:', error);
            dispatch(updateNewsFailure(error.message));
        }
    };
};

export const deleteNews = (newsId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${apiBaseURL}${urls.news.delete}`, { data: { id: newsId } });
            dispatch(deleteNewsSuccess(newsId));
        } catch (error) {
            console.error('Error deleting news:', error);
            dispatch(deleteNewsFailure(error.message));
        }
    };
};

// Додавання новини
export const createNewsRequest = () => {
    return {
        type: CREATE_NEWS_REQUEST,
    };
};

export const createNewsSuccess = (newNews) => {
    return {
        type: CREATE_NEWS_SUCCESS,
        payload: newNews,
    };
};

export const createNewsFailure = (error) => {
    return {
        type: CREATE_NEWS_FAILURE,
        payload: error,
    };
};

export const createNews = (newsData) => {
    return async (dispatch) => {
        dispatch(createNewsRequest());

        try {
            const response = await axios.post(`${apiBaseURL}${urls.news.create}`, newsData);
            dispatch(createNewsSuccess(response.data));
        } catch (error) {
            console.error('Error creating news:', error);
            dispatch(createNewsFailure(error.message));
        }
    };
};
