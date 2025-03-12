// src/store/reducers/epicWorks/epicWorksActions.js
import axios from 'axios';
import { apiBaseURL, urls } from "../../../configs/urls";
import {
    FETCH_EPIC_WORKS_REQUEST,
    FETCH_EPIC_WORKS_SUCCESS,
    FETCH_EPIC_WORKS_FAILURE,
    CREATE_EPIC_WORK_REQUEST,
    CREATE_EPIC_WORK_SUCCESS,
    CREATE_EPIC_WORK_FAILURE,
    UPDATE_EPIC_WORK_REQUEST,
    UPDATE_EPIC_WORK_SUCCESS,
    UPDATE_EPIC_WORK_FAILURE,
    DELETE_EPIC_WORK_REQUEST,
    DELETE_EPIC_WORK_SUCCESS,
    DELETE_EPIC_WORK_FAILURE,
    FETCH_EPIC_WORK_BY_ID_REQUEST,
    FETCH_EPIC_WORK_BY_ID_SUCCESS,
    FETCH_EPIC_WORK_BY_ID_FAILURE,
    SELECT_EPIC_WORK,
    DESELECT_EPIC_WORK,
} from './epicWorksTypes';

export const fetchEpicWorks = () => {
    return async (dispatch) => {
        dispatch(fetchEpicWorksRequest());
        try {
            const response = await axios.get(`${apiBaseURL}${urls.epicWorks.getAll}`);
            dispatch(fetchEpicWorksSuccess(response.data));
        } catch (error) {
            console.error('Error fetching epic works:', error);
            dispatch(fetchEpicWorksFailure(error.message));
        }
    };
};

export const fetchEpicWorksRequest = () => {
    return {
        type: FETCH_EPIC_WORKS_REQUEST,
    };
};

export const fetchEpicWorksSuccess = (epicWorks) => {
    return {
        type: FETCH_EPIC_WORKS_SUCCESS,
        payload: epicWorks,
    };
};

export const fetchEpicWorksFailure = (error) => {
    return {
        type: FETCH_EPIC_WORKS_FAILURE,
        payload: error,
    };
};

export const createEpicWork = (epicWorkData) => {
    return async (dispatch) => {
        dispatch(createEpicWorkRequest());
        try {
            const response = await axios.post(`${apiBaseURL}${urls.epicWorks.create}`, epicWorkData);
            dispatch(createEpicWorkSuccess(response.data));
        } catch (error) {
            console.error('Error creating epic work:', error);
            dispatch(createEpicWorkFailure(error.response?.data?.message || error.message));
        }
    };
};

export const createEpicWorkRequest = () => {
    return {
        type: CREATE_EPIC_WORK_REQUEST,
    };
};

export const createEpicWorkSuccess = (epicWork) => {
    return {
        type: CREATE_EPIC_WORK_SUCCESS,
        payload: epicWork,
    };
};

export const createEpicWorkFailure = (error) => {
    return {
        type: CREATE_EPIC_WORK_FAILURE,
        payload: error,
    };
};

export const updateEpicWork = (epicWorkId, epicWorkData) => {
    return async (dispatch) => {
        dispatch(updateEpicWorkRequest());
        try {
            const response = await axios.put(`${apiBaseURL}${urls.epicWorks.update}/${epicWorkId}`, epicWorkData);
            dispatch(updateEpicWorkSuccess(response.data));
        } catch (error) {
            console.error('Error updating epic work:', error);
            dispatch(updateEpicWorkFailure(error.response?.data?.message || error.message));
        }
    };
};

export const updateEpicWorkRequest = () => {
    return {
        type: UPDATE_EPIC_WORK_REQUEST,
    };
};

export const updateEpicWorkSuccess = (epicWork) => {
    return {
        type: UPDATE_EPIC_WORK_SUCCESS,
        payload: epicWork,
    };
};

export const updateEpicWorkFailure = (error) => {
    return {
        type: UPDATE_EPIC_WORK_FAILURE,
        payload: error,
    };
};

export const deleteEpicWork = (epicWorkId) => {
    return async (dispatch) => {
        dispatch(deleteEpicWorkRequest());
        try {
            await axios.delete(`${apiBaseURL}${urls.epicWorks.delete}/${epicWorkId}`);
            dispatch(deleteEpicWorkSuccess(epicWorkId));
        } catch (error) {
            console.error('Error deleting epic work:', error);
            dispatch(deleteEpicWorkFailure(error.message));
        }
    };
};

export const deleteEpicWorkRequest = () => {
    return {
        type: DELETE_EPIC_WORK_REQUEST,
    };
};

export const deleteEpicWorkSuccess = (epicWorkId) => {
    return {
        type: DELETE_EPIC_WORK_SUCCESS,
        payload: epicWorkId,
    };
};

export const deleteEpicWorkFailure = (error) => {
    return {
        type: DELETE_EPIC_WORK_FAILURE,
        payload: error,
    };
};

export const fetchEpicWorkById = (epicWorkId) => {
    return async (dispatch) => {
        dispatch(fetchEpicWorkByIdRequest());
        try {
            const response = await axios.get(`${apiBaseURL}${urls.epicWorks.getById}/${epicWorkId}`);
            dispatch(fetchEpicWorkByIdSuccess(response.data));
        } catch (error) {
            console.error('Error fetching epic work by ID:', error);
            dispatch(fetchEpicWorkByIdFailure(error.message));
        }
    };
};

export const fetchEpicWorkByIdRequest = () => {
    return {
        type: FETCH_EPIC_WORK_BY_ID_REQUEST,
    };
};

export const fetchEpicWorkByIdSuccess = (epicWork) => {
    return {
        type: FETCH_EPIC_WORK_BY_ID_SUCCESS,
        payload: epicWork,
    };
};

export const fetchEpicWorkByIdFailure = (error) => {
    return {
        type: FETCH_EPIC_WORK_BY_ID_FAILURE,
        payload: error,
    };
};

export const selectEpicWork = (epicWork) => {
    return {
        type: SELECT_EPIC_WORK,
        payload: epicWork,
    };
};

export const deselectEpicWork = () => {
    return {
        type: DESELECT_EPIC_WORK,
    };
};
