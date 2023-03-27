import React from 'react';
import Layout from '../../components/layout/Layout';
import useRedirectUser from '../../components/utils/useRedirectUser';
import './dashboard.css';

export default function Dashboard() {
    useRedirectUser('/login');
    return (
        <Layout>
            <h2>Welcome to Express App</h2>
        </Layout>
    );
};
