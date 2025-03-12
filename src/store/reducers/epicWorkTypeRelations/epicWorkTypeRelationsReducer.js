import {
    FETCH_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    FETCH_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
    FETCH_EPIC_WORK_TYPE_RELATIONS_FAILURE,
    FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_REQUEST,
    FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_SUCCESS,
    FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_FAILURE,
    CREATE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    CREATE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
    CREATE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
    UPDATE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    UPDATE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
    UPDATE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
    DELETE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    DELETE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
    DELETE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
    SELECT_EPIC_WORK_TYPE_RELATIONS,
    DESELECT_EPIC_WORK_TYPE_RELATIONS,
} from './epicWorkTypeRelationsTypes';

const initialState = {
    epicWorkTypeRelations: [],
    loading: false,
    error: null,
    selectedEpicWorkTypeRelation: null,
};

export const epicWorkTypeRelationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EPIC_WORK_TYPE_RELATIONS_REQUEST:
        case FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_REQUEST:
        case CREATE_EPIC_WORK_TYPE_RELATIONS_REQUEST:
        case UPDATE_EPIC_WORK_TYPE_RELATIONS_REQUEST:
        case DELETE_EPIC_WORK_TYPE_RELATIONS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_EPIC_WORK_TYPE_RELATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorkTypeRelations: action.payload,
            };
        case FETCH_EPIC_WORK_TYPE_RELATIONS_FAILURE:
        case FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_FAILURE:
        case CREATE_EPIC_WORK_TYPE_RELATIONS_FAILURE:
        case UPDATE_EPIC_WORK_TYPE_RELATIONS_FAILURE:
        case DELETE_EPIC_WORK_TYPE_RELATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedEpicWorkTypeRelation: action.payload,
            };
        case CREATE_EPIC_WORK_TYPE_RELATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorkTypeRelations: [...state.epicWorkTypeRelations, action.payload],
            };
        case UPDATE_EPIC_WORK_TYPE_RELATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorkTypeRelations: state.epicWorkTypeRelations.map(relation =>
                    relation.id === action.payload.id ? action.payload : relation
                ),
            };
        case DELETE_EPIC_WORK_TYPE_RELATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                epicWorkTypeRelations: state.epicWorkTypeRelations.filter(relation => relation.id !== action.payload),
            };
        case SELECT_EPIC_WORK_TYPE_RELATIONS:
            return {
                ...state,
                selectedEpicWorkTypeRelation: action.payload,
            };
        case DESELECT_EPIC_WORK_TYPE_RELATIONS:
            return {
                ...state,
                selectedEpicWorkTypeRelation: null,
            };
        default:
            return state;
    }
};

export const selectEpicWorkTypeRelations = (state) => state.epicWorkTypeRelations.epicWorkTypeRelations;
export const selectEpicWorkTypeRelationsLoading = (state) => state.epicWorkTypeRelations.loading;
export const selectEpicWorkTypeRelationsError = (state) => state.epicWorkTypeRelations.error;
