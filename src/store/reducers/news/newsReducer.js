import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE,
    UPDATE_NEWS_REQUEST,
    UPDATE_NEWS_SUCCESS,
    UPDATE_NEWS_FAILURE,
    DELETE_NEWS_REQUEST,
    DELETE_NEWS_SUCCESS,
    DELETE_NEWS_FAILURE
} from './newsTypes';

const initialState = {
    loading: false,
    news: [],
    error: '',
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_REQUEST:
        case UPDATE_NEWS_REQUEST:
        case DELETE_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_NEWS_SUCCESS:
        case UPDATE_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                news: [...action.payload.map(newsItem => ({ ...newsItem }))],
                error: '',
            };
        case FETCH_NEWS_FAILURE:
        case UPDATE_NEWS_FAILURE:
        case DELETE_NEWS_FAILURE:
            return {
                ...state,
                loading: false,
                news: [],
                error: action.payload,
            };
        case DELETE_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                news: state.news.filter(newsItem => newsItem.id !== action.payload),
                error: '',
            };
        default:
            return state;
    }
};

export { newsReducer };
