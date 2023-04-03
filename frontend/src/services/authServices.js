import axios from 'axios'
import { notification  } from 'antd';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
};

export const validateEmail = (email)=>{
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// User Registration
export const registerUserApiRequest = async(userData)=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, { withCredentials: true });
        if(response.statusText === "Created"){
            notification.success({
                message: 'User Registrated Successfully. Please check your email',
            });
        }
        return response.data;
    } catch (error) {
        // const message = (
        //     error.response && error.response.data && error.data.message
        // ) || error.message || error.toString();
        notification.error({
            message: error.response.data.message
        });
    }
}

// User Login
export const loginUserApiRequest = async(userData)=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData, {headers});
        if(response.statusText === "OK"){
            notification.success({
                message: 'Logged in Successfully',
            });
        }
        return response.data;
    } catch (error) {
        // const message = (
        //     error.response && error.response.data && error.data.message
        // ) || error.message || error.toString();
        notification.error({
            message: error.response.data.message
        });
    }
}

// User Logout
export const logoutUserApiRequest = async()=>{
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`);
        notification.success({
            message: 'Logged Out Successfully',
        });
    } catch (error) {
        notification.error({
            message: error.response.data.message
        });
    }
}

// User Forgot Password
export const forgotPasswordApiRequest = async(userData)=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData);
        notification.success({
            message: response.data.message,
        });
    } catch (error) {
        // const message = (
        //     error.response && error.response.data && error.data.message
        // ) || error.message || error.toString();
        notification.error({
            message: error.response.data.message
        });
    }
}

// User Forgot Password
export const resetPasswordApiRequest = async(userData, resetToken)=>{
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData);
        return response
    } catch (error) {
        return error.response.data
    }
}

// get user Loggedin Status
export const loggedinStatusApiRequest = async()=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin/`);
        return response.data
    } catch (error) {
        return error.response.data
    }
}