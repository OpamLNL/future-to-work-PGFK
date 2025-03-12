import {
    ADD_LIKE_REQUEST,
    ADD_LIKE_SUCCESS,
    ADD_LIKE_FAILURE,
    REMOVE_LIKE_REQUEST,
    REMOVE_LIKE_SUCCESS,
    REMOVE_LIKE_FAILURE
} from './likeByNewsTypes'; // Переконайтеся, що ви вказали правильний шлях до файлу типів дій

const initialState = {
    loading: false,
    likes: [],
    error: ''
};

export const likeByNewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LIKE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ADD_LIKE_SUCCESS:
            // Додавання лайка може включати додавання деталей лайка до масиву
            return {
                ...state,
                loading: false,
                likes: [...state.likes, action.payload],
                error: ''
            };
        case ADD_LIKE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case REMOVE_LIKE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case REMOVE_LIKE_SUCCESS:
            // Видалення лайка може включати видалення деталей лайка з масиву
            return {
                ...state,
                loading: false,
                likes: state.likes.filter(like => like.id !== action.payload),
                error: ''
            };
        case REMOVE_LIKE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

