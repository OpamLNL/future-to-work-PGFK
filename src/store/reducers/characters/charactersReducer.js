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

const initialState = {
    characters: [],
    loading: false,
    error: null,
    selectedCharacter: null,
};

export const charactersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHARACTERS_REQUEST:
        case FETCH_CHARACTER_BY_ID_REQUEST:
        case CREATE_CHARACTER_REQUEST:
        case UPDATE_CHARACTER_REQUEST:
        case DELETE_CHARACTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CHARACTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                characters: action.payload,
            };
        case FETCH_CHARACTERS_FAILURE:
        case FETCH_CHARACTER_BY_ID_FAILURE:
        case CREATE_CHARACTER_FAILURE:
        case UPDATE_CHARACTER_FAILURE:
        case DELETE_CHARACTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_CHARACTER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedCharacter: action.payload,
            };
        case CREATE_CHARACTER_SUCCESS:
            return {
                ...state,
                loading: false,
                characters: [...state.characters, action.payload],
            };
        case UPDATE_CHARACTER_SUCCESS:
            return {
                ...state,
                loading: false,
                characters: state.characters.map(character =>
                    character.id === action.payload.id ? action.payload : character
                ),
            };
        case DELETE_CHARACTER_SUCCESS:
            return {
                ...state,
                loading: false,
                characters: state.characters.filter(character => character.id !== action.payload),
            };
        case SELECT_CHARACTER:
            return {
                ...state,
                selectedCharacter: action.payload,
            };
        case DESELECT_CHARACTER:
            return {
                ...state,
                selectedCharacter: null,
            };
        default:
            return state;
    }
};
