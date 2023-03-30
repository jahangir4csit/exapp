import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Divider, Button, Popconfirm  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import { getProducts, selectIsLoading } from '../../redux/features/product/productSlice';
import useRedirectLoggedOutUser from "../../components/utils/useRedirectUser";
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';

import './products.css';


const columns = [
    {
    title: 'SL',
    dataIndex: 'key',
    width: 80
    },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Category',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Price',
    key: 'tags',
    dataIndex: 'tags',
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
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: 300,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: 200,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: 400,
  },
];

export default function Products() {

  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { products, isLoading } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, dispatch]);

  console.log(products, 'all products');

    return (
        <Layout>
            <h2>All Products</h2>
            <Table 
                columns={columns} 
                dataSource={data}
                footer={() => ''} 
                bordered
                isLoading 
            />
        </Layout>
    );
};
