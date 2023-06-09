import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Divider, Button, Popconfirm , Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import { getUsers, selectIsLoading } from '../../redux/features/users/userSlice';
import useRedirectUser from "../../components/utils/useRedirectUser";

import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';

// import './products.css';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Bio',
    dataIndex: 'bio',
    key: 'bio',
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: '_id',
    render: (record) => (
      <Space size="middle" className='action'>
        <Link to={`/users/edit-role/${record}`} className='flex items-center'><EditOutlined style={{ marginRight: '5px', color: '#389e0d'}} /> Edit</Link>
        <Divider type="vertical" />
        <Popconfirm
            placement="topRight"
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
        >
            <Button type="link" danger style={{ paddingLeft: 0, paddingRight: 0}} icon={<DeleteOutlined />}>
                <span style={{ marginInlineStart: 5 }}>Delete</span>
            </Button>
        </Popconfirm>
      </Space>
    ),
    width: 160
  },
];

export default function Users() {

  const navigate = useNavigate();

  useRedirectUser('/login');
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  const { users, isError } = useSelector(
    (state) => state.users
  );
  if(isError){
    navigate('/unauthorized');
  }
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getUsers());
    }
  }, [isLoggedIn, dispatch]);


    return (
        <Layout>
          <Spin spinning={isLoading}>
            <h2>All Users</h2>
            <Table 
                columns={columns} 
                dataSource={users}
                footer={() => ''} 
                bordered
                loading={isLoading}
            />
          </Spin>
        </Layout>
    );
};
