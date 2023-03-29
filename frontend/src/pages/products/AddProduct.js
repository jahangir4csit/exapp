import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useDispatch } from 'react-redux'
import { Input, Form, Button, Typography, notification, InputNumber, Select, Upload, Spin  } from 'antd';
import {FontSizeOutlined, ScanOutlined, PoundCircleOutlined, PlusOutlined  } from '@ant-design/icons'
import { createProduct } from '../../redux/features/product/productSlice';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const { Title  } = Typography;
// import './dashboard.css';


export default function AddProduct() {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (value) => {
        console.log('changed', value);
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    const onFinish = async(values) => {

        const {name, sku, price, quantity, category, description, image } = values
        //validation
        if(!name || !sku || !price || !quantity || !category){
          return notification.error({
            message: 'Validation Faild',
            description:
              'All fields are required',
          });
        }

        const productImage = image[0].originFileObj;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('sku', sku);
        formData.append('category', category);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', productImage);

        await dispatch(createProduct(formData)); 
        navigate('/products');

    };

    return (
        <Layout>
            <div className="space-align-block">
                <Title level={2} className='mb-6'>Create New Product</Title>
                <Form name="auth" className='mb-12' size="large" onFinish={onFinish} 
                style={{
                    maxWidth: 600,
                  }}
                >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input Product title!' }]}
                >
                    <Input size="large" 
                    prefix={<FontSizeOutlined
                    className="site-form-item-icon" />} 
                    placeholder="Product Title" 
                    />
                </Form.Item>
                <Form.Item
                    name="sku"
                    rules={[{ required: true, message: 'Please input product SKU' }]}
                >
                    <Input size="large" 
                    prefix={<ScanOutlined
                    className="site-form-item-icon" />} 
                    placeholder="Product SKU" 
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[{ required: true, message: 'Please input product price' }]}
                >
                    <Input size="large" 
                    prefix={<PoundCircleOutlined
                    className="site-form-item-icon" />} 
                    placeholder="Product Price" 
                    />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    rules={[{ required: true, message: 'Please input product quantity' }]}
                    label="Product Quantity"
                >
                    <InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
                </Form.Item>
                    <Form.Item
                    name="category"
                    rules={[{ required: true, message: 'Please select product category' }]}
                    label="Product Category"
                    >
                        <Select
                            showSearch
                            style={{
                            width: 200,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                            {
                                value: '1',
                                label: 'Not Identified',
                            },
                            {
                                value: '2',
                                label: 'Closed',
                            },
                            {
                                value: '3',
                                label: 'Communicated',
                            },
                            {
                                value: '4',
                                label: 'Identified',
                            },
                            {
                                value: '5',
                                label: 'Resolved',
                            },
                            {
                                value: '6',
                                label: 'Cancelled',
                            },
                            ]}
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        name="image" 
                        label="Upload Product Image" 
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload customRequest="" listType="picture-card" maxCount={1}>
                            <div>
                            <PlusOutlined />
                                <div
                                    style={{
                                    marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Please input product description' }]}
                    >
                        <Input.TextArea showCount maxLength={100} placeholder='Product Description' />
                    </Form.Item>
                    
                    <Form.Item className='mt-6'>
                        <Button type="primary" size="large" htmlType="submit" className='mr-4' loading={isLoading}>
                            Create Product
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    );
};