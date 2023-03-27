import React from 'react'
import { Link } from 'react-router-dom';
import { Input, Form, Button, Typography, notification  } from 'antd';
import {MailOutlined  } from '@ant-design/icons'
import AuthLayout from '../../components/layout/AuthLayout';
import { forgotPasswordApiRequest, validateEmail } from '../../services/authServices';

const { Paragraph, Title  } = Typography;
const tailLayout = {
    wrapperCol: {
      span: 20,
    },
  };

export default function Forgot() {

  const onFinish = async(values) => {
    const {email } = values;
    if(!email){
        notification.error({
            message: 'Validation Faild',
            description:
                'All fields are required',
        });
    }
    if(!validateEmail(email)){
        notification.error({
            message: 'Please enter a valid email',
        });
    }
    // User data
    const userData = {
        email
    }
    try {
        const data = await forgotPasswordApiRequest(userData);
    } catch (error) {
      notification.error({
        message: 'Error',
      });
    }
  }

  return (
    <AuthLayout>
        <div className="space-align-block">
            <Title level={2} className='mb-6'>Forgot Password</Title>
            <Form name="auth" className='mb-12' onFinish={onFinish}>
                
                <Form.Item 
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input size="large" placeholder="Email" prefix={<MailOutlined />} />

                </Form.Item>
                
                <Form.Item {...tailLayout} className='mt-6'>
                    <Button type="primary" size="large" htmlType="submit" className='mr-4'>
                    Get Reset Email
                    </Button>
                </Form.Item>
            </Form>
            <Paragraph>
                By signin up, you agree to our <Link to="#">Terms and Conditions</Link> & <Link to="#">Privacy Policy</Link>
            </Paragraph>
        </div>
    </AuthLayout>
  )
}

