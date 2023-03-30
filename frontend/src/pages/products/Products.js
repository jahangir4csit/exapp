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
    title: 'Product Image',
    dataIndex: 'image',
    width: 140,
    render: (img) => <img width={80} src={img.filePath} alt='' />
    },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Price',
    key: 'price',
    dataIndex: 'price',
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
                dataSource={products}
                footer={() => ''} 
                bordered
                loading={isLoading}
            />
        </Layout>
    );
};
