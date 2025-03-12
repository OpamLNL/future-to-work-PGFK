import axios from 'axios';
import { apiBaseURL, urls } from "../../../configs/urls";
import {
    FETCH_EPIC_WORK_TYPES_REQUEST,
    FETCH_EPIC_WORK_TYPES_SUCCESS,
    FETCH_EPIC_WORK_TYPES_FAILURE,
    CREATE_EPIC_WORK_TYPE_REQUEST,
    CREATE_EPIC_WORK_TYPE_SUCCESS,
    CREATE_EPIC_WORK_TYPE_FAILURE,
    UPDATE_EPIC_WORK_TYPE_REQUEST,
    UPDATE_EPIC_WORK_TYPE_SUCCESS,
    UPDATE_EPIC_WORK_TYPE_FAILURE,
    DELETE_EPIC_WORK_TYPE_REQUEST,
    DELETE_EPIC_WORK_TYPE_SUCCESS,
    DELETE_EPIC_WORK_TYPE_FAILURE,
    FETCH_EPIC_WORK_TYPE_BY_ID_REQUEST,
    FETCH_EPIC_WORK_TYPE_BY_ID_SUCCESS,
    FETCH_EPIC_WORK_TYPE_BY_ID_FAILURE,
    SELECT_EPIC_WORK_TYPE,
    DESELECT_EPIC_WORK_TYPE,
} from './epicWorkTypesTypes';

export const fetchEpicWorkTypes = () => {
    return async (dispatch) => {
        dispatch(fetchEpicWorkTypesRequest());
        try {
            const response = await axios.get(`${apiBaseURL}${urls.epicWorkTypes.getAll}`);
            dispatch(fetchEpicWorkTypesSuccess(response.data));
        } catch (error) {
            console.error('Error fetching epic works types:', error);
            dispatch(fetchEpicWorkTypesFailure(error.message));
        }
    };
};

export const fetchEpicWorkTypesRequest = () => {
    return {
        type: FETCH_EPIC_WORK_TYPES_REQUEST,
    };
};

export const fetchEpicWorkTypesSuccess = (epicWorkTypes) => {
    return {
        type: FETCH_EPIC_WORK_TYPES_SUCCESS,
        payload: epicWorkTypes,
    };
};

export const fetchEpicWorkTypesFailure = (error) => {
    return {
        type: FETCH_EPIC_WORK_TYPES_FAILURE,
        payload: error,
    };
};

export const createEpicWorkType = (epicWorkTypeData) => {
    return async (dispatch) => {
        dispatch(createEpicWorkTypeRequest());
        try {
            const response = await axios.post(`${apiBaseURL}${urls.epicWorkTypes.create}`, epicWorkTypeData);
            dispatch(createEpicWorkTypeSuccess(response.data));
        } catch (error) {
            console.error('Error creating epic works type:', error);
            dispatch(createEpicWorkTypeFailure(error.response?.data?.message || error.message));
        }
    };
};

export const createEpicWorkTypeRequest = () => {
    return {
        type: CREATE_EPIC_WORK_TYPE_REQUEST,
    };
};

export const createEpicWorkTypeSuccess = (epicWorkType) => {
    return {
        type: CREATE_EPIC_WORK_TYPE_SUCCESS,
        payload: epicWorkType,
    };
};

export const createEpicWorkTypeFailure = (error) => {
    return {
        type: CREATE_EPIC_WORK_TYPE_FAILURE,
        payload: error,
    };
};

export const updateEpicWorkType = (epicWorkTypeId, epicWorkTypeData) => {
    return async (dispatch) => {
        dispatch(updateEpicWorkTypeRequest());
        try {
            const response = await axios.put(`${apiBaseURL}${urls.epicWorkTypes.update}/${epicWorkTypeId}`, epicWorkTypeData);
            dispatch(updateEpicWorkTypeSuccess(response.data));
        } catch (error) {
            console.error('Error updating epic works type:', error);
            dispatch(updateEpicWorkTypeFailure(error.response?.data?.message || error.message));
        }
    };
};

export const updateEpicWorkTypeRequest = () => {
    return {
        type: UPDATE_EPIC_WORK_TYPE_REQUEST,
    };
};

export const updateEpicWorkTypeSuccess = (epicWorksType) => {
    return {
        type: UPDATE_EPIC_WORK_TYPE_SUCCESS,
        payload: epicWorksType,
    };
};

export const updateEpicWorkTypeFailure = (error) => {
    return {
        type: UPDATE_EPIC_WORK_TYPE_FAILURE,
        payload: error,
    };
};

export const deleteEpicWorkType = (epicWorkTypeId) => {
    return async (dispatch) => {
        dispatch(deleteEpicWorkTypeRequest());
        try {
            await axios.delete(`${apiBaseURL}${urls.epicWorkTypes.delete}/${epicWorkTypeId}`);
            dispatch(deleteEpicWorkTypeSuccess(epicWorkTypeId));
        } catch (error) {
            console.error('Error deleting epic works type:', error);
            dispatch(deleteEpicWorkTypeFailure(error.message));
        }
    };
};

export const deleteEpicWorkTypeRequest = () => {
    return {
        type: DELETE_EPIC_WORK_TYPE_REQUEST,
    };
};

export const deleteEpicWorkTypeSuccess = (epicWorkTypeId) => {
    return {
        type: DELETE_EPIC_WORK_TYPE_SUCCESS,
        payload: epicWorkTypeId,
    };
};

export const deleteEpicWorkTypeFailure = (error) => {
    return {
        type: DELETE_EPIC_WORK_TYPE_FAILURE,
        payload: error,
    };
};

export const fetchEpicWorkTypeById = (epicWorkTypeId) => {
    return async (dispatch) => {
        dispatch(fetchEpicWorkTypeByIdRequest());
        try {
            const response = await axios.get(`${apiBaseURL}${urls.epicWorkTypes.getById}/${epicWorkTypeId}`);
            dispatch(fetchEpicWorkTypeByIdSuccess(response.data));
        } catch (error) {
            console.error('Error fetching epic works type by ID:', error);
            dispatch(fetchEpicWorkTypeByIdFailure(error.message));
        }
    };
};

export const fetchEpicWorkTypeByIdRequest = () => {
    return {
        type: FETCH_EPIC_WORK_TYPE_BY_ID_REQUEST,
    };
};

export const fetchEpicWorkTypeByIdSuccess = (epicWorksType) => {
    return {
        type: FETCH_EPIC_WORK_TYPE_BY_ID_SUCCESS,
        payload: epicWorksType,
    };
};

export const fetchEpicWorkTypeByIdFailure = (error) => {
    return {
        type: FETCH_EPIC_WORK_TYPE_BY_ID_FAILURE,
        payload: error,
    };
};

export const selectEpicWorkType = (epicWorkType) => {
    return {
        type: SELECT_EPIC_WORK_TYPE,
        payload: epicWorkType,
    };
};

export const deselectEpicWorkType = () => {
    return {
        type: DESELECT_EPIC_WORK_TYPE,
    };
};
