import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import {Typography} from 'antd';
const { Title  } = Typography;


export default function Unauthorized() {

    return (
        <div className='flex items-center overflow-hidden min-h-screen' style={{ backgroundColor: '#ebedef'}}>
            <div className='bg-theme' style={{ padding: '40px', width: '30%', margin: 'auto', borderRadius: 24}}>
                <Title style={{ textAlign: 'center', color: '#fdd021', marginBottom: 0, marginTop:0, fontSize:60 }}>401</Title>
                <Title style={{ textAlign: 'center', color: '#fdd021', marginBottom: 0, marginTop:0, fontSize:50, textTransform: 'uppercase' }}>Unauthorized</Title>
            </div>
        </div>
    );
};