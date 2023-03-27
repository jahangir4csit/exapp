import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import { useDispatch } from 'react-redux'
import { Input, Form, Button, Typography, notification, InputNumber, Select, Upload, Spin  } from 'antd';
import {FontSizeOutlined, ScanOutlined, PoundCircleOutlined, PlusOutlined  } from '@ant-design/icons'
const { Title  } = Typography;
// import './dashboard.css';


export default function AddCategory() {

    const [isLoading, setIsLoading] = useState(false);

    const onChange = (value) => {
        console.log('changed', value);
      };

    const onFinish = async(values) => {
        const {name, email, password, password2 } = values
        if(!name || !email || !password){
          return notification.error({
            message: 'Validation Faild',
            description:
              'All fields are required',
          });
        }
    };

    return (
        <Layout>
            <div className="space-align-block">
                <Title level={2} className='mb-6'>Create New Category</Title>
                <Form name="auth" className='mb-12' size="large" onFinish={onFinish} 
                style={{
                    maxWidth: 600,
                  }}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input category title!' }]}
                    >
                        <Input size="large" 
                        prefix={<FontSizeOutlined
                        className="site-form-item-icon" />} 
                        placeholder="Category Title" 
                        />
                    </Form.Item>
                    <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Please input category description' }]}>
                        <Input.TextArea showCount maxLength={100} placeholder='Category Description' />
                    </Form.Item>
                    <Form.Item valuePropName="fileList">
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                            <PlusOutlined />
                            <div
                                style={{
                                marginTop: 0,
                                padding: 4
                                }}
                            >
                                Category Image
                            </div>
                            </div>
                        </Upload>
                    </Form.Item>
                
                    <Form.Item className='mt-6'>
                        <Button type="primary" size="large" htmlType="submit" className='mr-4' loading={isLoading}>
                            Create Category
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    );
};