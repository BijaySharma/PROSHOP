import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants";

export const login = (email, password) => async dispatch => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } =  await axios.post('/api/users/login', {email, password}, config);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({ 
            type: USER_LOGIN_FAIL, 
            payload: error.response &&
             error.response.data.message 
             ? error.response.data.message 
             : error.message
        });
    }
};

export const loadUser =  () => async dispatch => {
    try{
        const { data } = await axios.get('/api/users/credentials');
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
    }catch(error){
        console.log(error);
    }
}

export const logOut = () => async dispatch => {
    try{
        const { data } = await axios.post('/api/users/logout');
        dispatch({
            type: USER_LOGOUT
        });
    }catch(error){
        alert("Failed to Log out, Please try again!");
    }
};