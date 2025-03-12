import axios from 'axios';
import { apiBaseURL, urls } from "../../../configs/urls";
import {
    FETCH_CHARACTERS_REQUEST,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_FAILURE,
    FETCH_CHARACTER_BY_ID_REQUEST,
    FETCH_CHARACTER_BY_ID_SUCCESS,
    FETCH_CHARACTER_BY_ID_FAILURE,
    CREATE_CHARACTER_REQUEST,
    CREATE_CHARACTER_SUCCESS,
    CREATE_CHARACTER_FAILURE,
    UPDATE_CHARACTER_REQUEST,
    UPDATE_CHARACTER_SUCCESS,
    UPDATE_CHARACTER_FAILURE,
    DELETE_CHARACTER_REQUEST,
    DELETE_CHARACTER_SUCCESS,
    DELETE_CHARACTER_FAILURE,
    SELECT_CHARACTER,
    DESELECT_CHARACTER,
} from './charactersTypes';

export const fetchCharacters = () => {
    return async (dispatch) => {
        dispatch(fetchCharactersRequest());
        try {
            console.log(`${apiBaseURL}${urls.characters.getAll}`);

            const response = await axios.get(`${apiBaseURL}${urls.characters.getAll}`);
            dispatch(fetchCharactersSuccess(response.data));
        } catch (error) {
            console.error('Error fetching characters:', error);
            dispatch(fetchCharactersFailure(error.message));
        }
    };
};


export const fetchCharactersRequest = () => {
    return {
        type: FETCH_CHARACTERS_REQUEST,
    };
};

export const fetchCharactersSuccess = (characters) => {
    return {
        type: FETCH_CHARACTERS_SUCCESS,
        payload: characters,
    };
};

export const fetchCharactersFailure = (error) => {
    return {
        type: FETCH_CHARACTERS_FAILURE,
        payload: error,
    };
};






export const createCharacter = (characterData) => {
    return async (dispatch) => {
        dispatch(createCharacterRequest());
        try {
            const response = await axios.post(`${apiBaseURL}${urls.characters.create}`, characterData);
            dispatch(createCharacterSuccess(response.data));
        } catch (error) {
            console.error('Error creating character:', error);
            dispatch(createCharacterFailure(error.response?.data?.message || error.message));
        }
    };
};

export const createCharacterRequest = () => {
    return {
        type: CREATE_CHARACTER_REQUEST,
    };
};

export const createCharacterSuccess = (character) => {
    return {
        type: CREATE_CHARACTER_SUCCESS,
        payload: character,
    };
};

export const createCharacterFailure = (error) => {
    return {
        type: CREATE_CHARACTER_FAILURE,
        payload: error,
    };
};

export const updateCharacter = (characterId, characterData) => {
    return async (dispatch) => {
        dispatch(updateCharacterRequest());
        try {
            const response = await axios.put(`${apiBaseURL}${urls.characters.update}/${characterId}`, characterData);
            dispatch(updateCharacterSuccess(response.data));
        } catch (error) {
            console.error('Error updating character:', error);
            dispatch(updateCharacterFailure(error.response?.data?.message || error.message));
        }
    };
};

export const updateCharacterRequest = () => {
    return {
        type: UPDATE_CHARACTER_REQUEST,
    };
};

export const updateCharacterSuccess = (character) => {
    return {
        type: UPDATE_CHARACTER_SUCCESS,
        payload: character,
    };
};

export const updateCharacterFailure = (error) => {
    return {
        type: UPDATE_CHARACTER_FAILURE,
        payload: error,
    };
};

export const deleteCharacter = (characterId) => {
    return async (dispatch) => {
        dispatch(deleteCharacterRequest());
        try {
            await axios.delete(`${apiBaseURL}${urls.characters.delete}/${characterId}`);
            dispatch(deleteCharacterSuccess(characterId));
        } catch (error) {
            console.error('Error deleting character:', error);
            dispatch(deleteCharacterFailure(error.message));
        }
    };
};

export const deleteCharacterRequest = () => {
    return {
        type: DELETE_CHARACTER_REQUEST,
    };
};

export const deleteCharacterSuccess = (characterId) => {
    return {
        type: DELETE_CHARACTER_SUCCESS,
        payload: characterId,
    };
};

export const deleteCharacterFailure = (error) => {
    return {
        type: DELETE_CHARACTER_FAILURE,
        payload: error,
    };
};

export const fetchCharacterById = async (characterId) => {
    try {
        const response = await fetch(`${apiBaseURL}${urls.characters.getById.replace(':id', characterId)}`);
        if (!response.ok) {
            throw new Error(`Error fetching character data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching character data:', error);
        throw error;
    }
};


export const fetchCharacterByIdRequest = () => {
    return {
        type: FETCH_CHARACTER_BY_ID_REQUEST,
    };
};

export const fetchCharacterByIdSuccess = (character) => {
    return {
        type: FETCH_CHARACTER_BY_ID_SUCCESS,
        payload: character,
    };
};

export const fetchCharacterByIdFailure = (error) => {
    return {
        type: FETCH_CHARACTER_BY_ID_FAILURE,
        payload: error,
    };
};

export const selectCharacter = (character) => {
    return {
        type: SELECT_CHARACTER,
        payload: character,
    };
};

export const deselectCharacter = () => {
    return {
        type: DESELECT_CHARACTER,
    };
};
