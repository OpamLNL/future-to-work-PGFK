import {
    FETCH_EPIC_WORK_TYPES_REQUEST,
    FETCH_EPIC_WORK_TYPES_SUCCESS,
    FETCH_EPIC_WORK_TYPES_FAILURE,
    FETCH_EPIC_WORK_TYPE_BY_ID_REQUEST,
    FETCH_EPIC_WORK_TYPE_BY_ID_SUCCESS,
    FETCH_EPIC_WORK_TYPE_BY_ID_FAILURE,
    CREATE_EPIC_WORK_TYPE_REQUEST,
    CREATE_EPIC_WORK_TYPE_SUCCESS,
    CREATE_EPIC_WORK_TYPE_FAILURE,
    UPDATE_EPIC_WORK_TYPE_REQUEST,
    UPDATE_EPIC_WORK_TYPE_SUCCESS,
    UPDATE_EPIC_WORK_TYPE_FAILURE,
    DELETE_EPIC_WORK_TYPE_REQUEST,
    DELETE_EPIC_WORK_TYPE_SUCCESS,
    DELETE_EPIC_WORK_TYPE_FAILURE,
    SELECT_EPIC_WORK_TYPE,
    DESELECT_EPIC_WORK_TYPE,
} from './epicWorkTypesTypes';

const initialState = {
    epicWorkTypes: [],
    loading: false,
    error: null,
    selectedEpicWorkType: null,
};

export const epicWorkTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EPIC_WORK_TYPES_REQUEST:
        case FETCH_EPIC_WORK_TYPE_BY_ID_REQUEST:
        case CREATE_EPIC_WORK_TYPE_REQUEST:
        case UPDATE_EPIC_WORK_TYPE_REQUEST:
        case DELETE_EPIC_WORK_TYPE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_EPIC_WORK_TYPES_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorkTypes: action.payload,
            };
        case FETCH_EPIC_WORK_TYPES_FAILURE:
        case FETCH_EPIC_WORK_TYPE_BY_ID_FAILURE:
        case CREATE_EPIC_WORK_TYPE_FAILURE:
        case UPDATE_EPIC_WORK_TYPE_FAILURE:
        case DELETE_EPIC_WORK_TYPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_EPIC_WORK_TYPE_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedEpicWorkType: action.payload,
            };
        case CREATE_EPIC_WORK_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorkTypes: [...state.epicWorkTypes, action.payload],
            };
        case UPDATE_EPIC_WORK_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorkTypes: state.epicWorkTypes.map(type =>
                    type.id === action.payload.id ? action.payload : type
                ),
            };
        case DELETE_EPIC_WORK_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorksTypes: state.epicWorksTypes.filter(type => type.id !== action.payload),
            };
        case SELECT_EPIC_WORK_TYPE:
            return {
                ...state,
                selectedEpicWorkType: action.payload,
            };
        case DESELECT_EPIC_WORK_TYPE:
            return {
                ...state,
                selectedEpicWorkType: null,
            };
        default:
            return state;
    }
};
