import axios from 'axios';
import { apiBaseURL, urls } from "../../../configs/urls";
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    AUTHENTICATE_USER,
    FETCH_USER_BY_USERNAME_FAILURE,
    FETCH_USER_BY_USERNAME_SUCCESS,
    FETCH_USER_BY_USERNAME_REQUEST
} from './usersTypes';

export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(fetchUsersRequest());
        try {
            const response = await axios.get(`${apiBaseURL}${urls.users.getAll}`);
            dispatch(fetchUsersSuccess(response.data));
        } catch (error) {
            console.error('Error fetching users:', error);
            dispatch(fetchUsersFailure(error.message));
        }
    };
};

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    };
};

export const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    };
};

export const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    };
};

export const createUser = (userData) => {
    return async (dispatch) => {
        dispatch(fetchUsersRequest());
        try {
            const response = await axios.post(`${apiBaseURL}${urls.users.create}`, userData);

            const { user, accessToken, refreshToken } = response.data;

            localStorage.setItem('jwtAccessToken', accessToken);
            localStorage.setItem('jwtRefreshToken', refreshToken);

            localStorage.setItem('user', JSON.stringify(user));

            dispatch(createUserSuccess(user));
            dispatch({
                type: AUTHENTICATE_USER,
                payload: user
            });
        } catch (error) {
            console.error('Error creating user:', error);
            dispatch(createUserFailure(error.response?.data?.message || error.message));
        }
    };
};

export const createUserSuccess = (user) => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: user,
    };
};

export const createUserFailure = (error) => {
    return {
        type: CREATE_USER_FAILURE,
        payload: error,
    };
};

export const updateUser = (userId, userData) => {

    return async (dispatch) => {
        dispatch(fetchUsersRequest());


        try {
            const response = await axios.put(`${apiBaseURL}${urls.users.update}/${userId}`, userData);

            const updatedUser = response.data;

            dispatch(updateUserSuccess(updatedUser));
        } catch (error) {
            console.error('Error updating user:', error);
            dispatch(updateUserFailure(error.response?.data?.message || error.message));
        }
    };
};

export const updateUserSuccess = (user) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: user,
    };
};

export const updateUserFailure = (error) => {
    return {
        type: UPDATE_USER_FAILURE,
        payload: error,
    };
};

export const deleteUser = (userId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${apiBaseURL}${urls.users.delete}/:${userId}`);
            dispatch(deleteUserSuccess(userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            dispatch(deleteUserFailure(error.message));
        }
    };
};

export const deleteUserSuccess = (userId) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: userId,
    };
};

export const deleteUserFailure = (error) => {
    return {
        type: DELETE_USER_FAILURE,
        payload: error,
    };
};

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    };
};


export const fetchUserByUsername = (username) => {
    return async (dispatch) => {
        dispatch(fetchUserByUsernameRequest());
        try {
            const response = await axios.get(`${apiBaseURL}${urls.users.getByUsername}/${username}`);

            dispatch(fetchUserByUsernameSuccess(response.data));

        } catch (error) {
            console.error('Error fetching user by username:', error);
            dispatch(fetchUserByUsernameFailure(error.message));
        }
    };
};


export const fetchUserByUsernameRequest = () => {
    return {
        type: FETCH_USER_BY_USERNAME_REQUEST,
    };
};

export const fetchUserByUsernameSuccess = (user) => {
    return {
        type: FETCH_USER_BY_USERNAME_SUCCESS,
        payload: user,
    };
};

export const fetchUserByUsernameFailure = (error) => {
    return {
        type: FETCH_USER_BY_USERNAME_FAILURE,
        payload: error,
    };
};
