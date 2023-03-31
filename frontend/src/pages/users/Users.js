import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Divider, Button, Popconfirm  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import { getUsers, selectIsLoading } from '../../redux/features/users/userSlice';
import useRedirectLoggedOutUser from "../../components/utils/useRedirectUser";
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
    render: (_, record) => (
      <Space size="middle" className='action'>
        <Link to={'/edit-product'} className='flex items-center'><EditOutlined style={{ marginRight: '5px', color: '#389e0d'}} /> Edit</Link>
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

  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { users, isLoading } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getUsers());
    }
  }, [isLoggedIn, dispatch]);

  console.log(users, 'all Users');

    return (
        <Layout>
            <h2>All Users</h2>
            <Table 
                columns={columns} 
                dataSource={users}
                footer={() => ''} 
                bordered
                loading={isLoading}
            />
        </Layout>
    );
};
