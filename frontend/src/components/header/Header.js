import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Button } from 'antd';
import { logoutUserApiRequest } from '../../services/authServices';
import { selectName, SET_LOGIN } from '../../redux/features/auth/authSlice';


export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(selectName);

    const logout = async()=>{
        await logoutUserApiRequest();
        await dispatch(SET_LOGIN(false));
        navigate("/");
    };

    const items = [
        {
            label: (<span>{name}<small className='block'>Admin</small></span>),
            key: '0',
        },
                {
            type: 'divider',
        },
        {
            label: (
            <a target="_blank" rel="noopener noreferrer" href="/profile">
                Profile
            </a>
            ),
            key: '1',
        },
        {
            label: (
            <a target="_blank" rel="noopener noreferrer" href="/reset">
                Reset Password
            </a>
            ),
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: (
            <Button onClick={logout} type='link'>Logout</Button>),
            key: '3'
        },
    ];

  return (
    <header className='topbar px-8 border border-b'>
        <div className='h-full flex items-center'>
            <a className='logo' href='/logo'>Express App</a>
            <div className='topbar-intro border border-l h-full w-full'>
                <div className='flex items-center justify-end h-full px-6'>
                    <div className='account-drodown w-8 h-8 rounded-full overflow-hidden'>
                        <Dropdown 
                        menu={{ items }} 
                        placement="bottom" 
                        trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()} href='/#'>
                                <img className='rounded-full object-cover w-full h-full cursor-pointer' src='https://icewall.left4code.com/dist/images/profile-1.jpg' alt='user' />
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
