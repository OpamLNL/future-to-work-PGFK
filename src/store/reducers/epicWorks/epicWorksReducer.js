// src/store/reducers/epicWorks/epicWorksReducer.js
import {
    FETCH_EPIC_WORKS_REQUEST,
    FETCH_EPIC_WORKS_SUCCESS,
    FETCH_EPIC_WORKS_FAILURE,
    FETCH_EPIC_WORK_BY_ID_REQUEST,
    FETCH_EPIC_WORK_BY_ID_SUCCESS,
    FETCH_EPIC_WORK_BY_ID_FAILURE,
    CREATE_EPIC_WORK_REQUEST,
    CREATE_EPIC_WORK_SUCCESS,
    CREATE_EPIC_WORK_FAILURE,
    UPDATE_EPIC_WORK_REQUEST,
    UPDATE_EPIC_WORK_SUCCESS,
    UPDATE_EPIC_WORK_FAILURE,
    DELETE_EPIC_WORK_REQUEST,
    DELETE_EPIC_WORK_SUCCESS,
    DELETE_EPIC_WORK_FAILURE,
    SELECT_EPIC_WORK,
    DESELECT_EPIC_WORK,
} from './epicWorksTypes';

const initialState = {
    epicWorks: [],
    loading: false,
    error: null,
    selectedEpicWork: null,
};

export const epicWorksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EPIC_WORKS_REQUEST:
        case FETCH_EPIC_WORK_BY_ID_REQUEST:
        case CREATE_EPIC_WORK_REQUEST:
        case UPDATE_EPIC_WORK_REQUEST:
        case DELETE_EPIC_WORK_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_EPIC_WORKS_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorks: action.payload,
            };
        case FETCH_EPIC_WORKS_FAILURE:
        case FETCH_EPIC_WORK_BY_ID_FAILURE:
        case CREATE_EPIC_WORK_FAILURE:
        case UPDATE_EPIC_WORK_FAILURE:
        case DELETE_EPIC_WORK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_EPIC_WORK_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedEpicWork: action.payload,
            };
        case CREATE_EPIC_WORK_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorks: [...state.epicWorks, action.payload],
            };
        case UPDATE_EPIC_WORK_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorks: state.epicWorks.map(work =>
                    work.id === action.payload.id ? action.payload : work
                ),
            };
        case DELETE_EPIC_WORK_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorks: state.epicWorks.filter(work => work.id !== action.payload),
            };
        case SELECT_EPIC_WORK:
            return {
                ...state,
                selectedEpicWork: action.payload,
            };
        case DESELECT_EPIC_WORK:
            return {
                ...state,
                selectedEpicWork: null,
            };
        default:
            return state;
    }
};

