import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    SELECT_USER,
    DESELECT_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    AUTHENTICATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    FETCH_USER_BY_USERNAME_REQUEST,
    FETCH_USER_BY_USERNAME_SUCCESS,
    FETCH_USER_BY_USERNAME_FAILURE,
} from './usersTypes';

const initialState = {
    loading: false,
    users: [],
    error: '',
    currentUser: null,
    isAuthenticated: false,
    selectedUser: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case FETCH_USER_BY_USERNAME_REQUEST:
        case CREATE_USER_FAILURE:
        case DELETE_USER_SUCCESS:
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            };
        case FETCH_USERS_FAILURE:
        case DELETE_USER_FAILURE:
        case FETCH_USER_BY_USERNAME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                isAuthenticated: true,
                error: ''
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                isAuthenticated: true,
                error: ''
            };
        case AUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: true,
                currentUser: action.payload
            };
        case SELECT_USER:
            return {
                ...state,
                selectedUser: action.payload
            };
        case DESELECT_USER:
            return {
                ...state,
                selectedUser: null
            };
        case FETCH_USER_BY_USERNAME_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                isAuthenticated: true,
                error: ''
            };
        default:
            return state;
    }
};

export { usersReducer };
