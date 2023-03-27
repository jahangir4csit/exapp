import { notification } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN } from '../../redux/features/auth/authSlice';
import { loggedinStatusApiRequest } from '../../services/authServices'



const useRedirectUser = (path) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(
        ()=>{
            const redirectLoggedOutUser = async()=>{
                const isLoggedin = await loggedinStatusApiRequest();
                dispatch(SET_LOGIN(isLoggedin));
                if(!isLoggedin){
                    notification.info({
                        message: 'Session Expired, Please login to continue '
                    });
                    navigate(path)
                }
            };
            redirectLoggedOutUser()
        }, [navigate, path, dispatch]);
}

export default useRedirectUser