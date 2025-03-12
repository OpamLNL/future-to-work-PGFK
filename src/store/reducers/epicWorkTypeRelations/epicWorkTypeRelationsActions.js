import axios from 'axios';
import { apiBaseURL, urls } from "../../../configs/urls";
import {
    FETCH_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    FETCH_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
    FETCH_EPIC_WORK_TYPE_RELATIONS_FAILURE,
    CREATE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    CREATE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
    CREATE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
    UPDATE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    UPDATE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
    UPDATE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
    DELETE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    DELETE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
    DELETE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
    FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_REQUEST,
    FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_SUCCESS,
    FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_FAILURE,
    SELECT_EPIC_WORK_TYPE_RELATIONS,
    DESELECT_EPIC_WORK_TYPE_RELATIONS,
} from './epicWorkTypeRelationsTypes';

export const fetchEpicWorkTypeRelations = () => {
    return async (dispatch) => {
        dispatch(fetchEpicWorkTypeRelationsRequest());
        try {
            const response = await axios.get(`${apiBaseURL}${urls.epicWorkTypeRelations.getAll}`);
            dispatch(fetchEpicWorkTypeRelationsSuccess(response.data));
        } catch (error) {
            console.error('Error fetching epic work type relations:', error);
            dispatch(fetchEpicWorkTypeRelationsFailure(error.message));
        }
    };
};

export const fetchEpicWorkTypeRelationsRequest = () => {
    return {
        type: FETCH_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    };
};

export const fetchEpicWorkTypeRelationsSuccess = (epicWorkTypeRelations) => {
    return {
        type: FETCH_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
        payload: epicWorkTypeRelations,
    };
};

export const fetchEpicWorkTypeRelationsFailure = (error) => {
    return {
        type: FETCH_EPIC_WORK_TYPE_RELATIONS_FAILURE,
        payload: error,
    };
};

export const createEpicWorkTypeRelations = (epicWorkTypeRelationsData) => {
    return async (dispatch) => {
        dispatch(createEpicWorkTypeRelationsRequest());
        try {
            const response = await axios.post(`${apiBaseURL}${urls.epicWorkTypeRelations.create}`, epicWorkTypeRelationsData);
            dispatch(createEpicWorkTypeRelationsSuccess(response.data));
        } catch (error) {
            console.error('Error creating epic work type relation:', error);
            dispatch(createEpicWorkTypeRelationsFailure(error.response?.data?.message || error.message));
        }
    };
};

export const createEpicWorkTypeRelationsRequest = () => {
    return {
        type: CREATE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    };
};

export const createEpicWorkTypeRelationsSuccess = (epicWorkTypeRelation) => {
    return {
        type: CREATE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
        payload: epicWorkTypeRelation,
    };
};

export const createEpicWorkTypeRelationsFailure = (error) => {
    return {
        type: CREATE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
        payload: error,
    };
};

export const updateEpicWorkTypeRelations = (epicWorkTypeRelationsId, epicWorkTypeRelationsData) => {
    return async (dispatch) => {
        dispatch(updateEpicWorkTypeRelationsRequest());
        try {
            const response = await axios.put(`${apiBaseURL}${urls.epicWorkTypeRelations.update}/${epicWorkTypeRelationsId}`, epicWorkTypeRelationsData);
            dispatch(updateEpicWorkTypeRelationsSuccess(response.data));
        } catch (error) {
            console.error('Error updating epic work type relation:', error);
            dispatch(updateEpicWorkTypeRelationsFailure(error.response?.data?.message || error.message));
        }
    };
};

export const updateEpicWorkTypeRelationsRequest = () => {
    return {
        type: UPDATE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    };
};

export const updateEpicWorkTypeRelationsSuccess = (epicWorkTypeRelation) => {
    return {
        type: UPDATE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
        payload: epicWorkTypeRelation,
    };
};

export const updateEpicWorkTypeRelationsFailure = (error) => {
    return {
        type: UPDATE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
        payload: error,
    };
};

export const deleteEpicWorkTypeRelations = (epicWorkTypeRelationsId) => {
    return async (dispatch) => {
        dispatch(deleteEpicWorkTypeRelationsRequest());
        try {
            await axios.delete(`${apiBaseURL}${urls.epicWorkTypeRelations.delete}/${epicWorkTypeRelationsId}`);
            dispatch(deleteEpicWorkTypeRelationsSuccess(epicWorkTypeRelationsId));
        } catch (error) {
            console.error('Error deleting epic work type relation:', error);
            dispatch(deleteEpicWorkTypeRelationsFailure(error.message));
        }
    };
};

export const deleteEpicWorkTypeRelationsRequest = () => {
    return {
        type: DELETE_EPIC_WORK_TYPE_RELATIONS_REQUEST,
    };
};

export const deleteEpicWorkTypeRelationsSuccess = (epicWorkTypeRelationsId) => {
    return {
        type: DELETE_EPIC_WORK_TYPE_RELATIONS_SUCCESS,
        payload: epicWorkTypeRelationsId,
    };
};

export const deleteEpicWorkTypeRelationsFailure = (error) => {
    return {
        type: DELETE_EPIC_WORK_TYPE_RELATIONS_FAILURE,
        payload: error,
    };
};

export const fetchEpicWorkTypeRelationsById = (epicWorkTypeRelationsId) => {
    return async (dispatch) => {
        dispatch(fetchEpicWorkTypeRelationsByIdRequest());
        try {
            const response = await axios.get(`${apiBaseURL}${urls.epicWorkTypeRelations.getById}/${epicWorkTypeRelationsId}`);
            dispatch(fetchEpicWorkTypeRelationsByIdSuccess(response.data));
        } catch (error) {
            console.error('Error fetching epic work type relation by ID:', error);
            dispatch(fetchEpicWorkTypeRelationsByIdFailure(error.message));
        }
    };
};

export const fetchEpicWorkTypeRelationsByIdRequest = () => {
    return {
        type: FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_REQUEST,
    };
};

export const fetchEpicWorkTypeRelationsByIdSuccess = (epicWorkTypeRelation) => {
    return {
        type: FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_SUCCESS,
        payload: epicWorkTypeRelation,
    };
};

export const fetchEpicWorkTypeRelationsByIdFailure = (error) => {
    return {
        type: FETCH_EPIC_WORK_TYPE_RELATIONS_BY_ID_FAILURE,
        payload: error,
    };
};

export const selectEpicWorkTypeRelations = (epicWorkTypeRelation) => {
    return {
        type: SELECT_EPIC_WORK_TYPE_RELATIONS,
        payload: epicWorkTypeRelation,
    };
};

export const deselectEpicWorkTypeRelations = () => {
    return {
        type: DESELECT_EPIC_WORK_TYPE_RELATIONS,
    };
};
