import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Input, Form, Button, Typography, notification, Spin  } from 'antd';
import {UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined, MailOutlined  } from '@ant-design/icons'
import AuthLayout from '../../components/layout/AuthLayout';
import { registerUserApiRequest, validateEmail } from '../../services/authServices';
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';



const { Paragraph, Title, Text  } = Typography;
const tailLayout = {
    wrapperCol: {
      span: 20,
    },
  };

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const onFinish = async(values) => {
    const {name, email, password, password2 } = values
    if(!name || !email || !password){
      return notification.error({
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
    if(password.length < 6){
      return notification.error({
        message: 'Password Must be upto 6 Characters',
      });
    }
    if(password !== password2){
      return notification.error({
        message: 'Password do not match',
      });
    }

    // User data 
    const userData = {
      name, email, password
    }
      setIsLoading(true);
      try {
        const data = await registerUserApiRequest(userData)
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_NAME(data.name));
        navigate("/dashboard");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }

  };

  return (
    <AuthLayout>
      <div className="space-align-block">
        <Title level={2} className='mb-6'>Registration</Title>
        <Form name="auth" className='mb-12' onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size="large" 
            prefix={<UserOutlined 
              className="site-form-item-icon" />} 
            placeholder="Name" 
            />
          </Form.Item>
            <Form.Item 
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input a valid Email!' }]}
            >
                <Input size="large" 
                placeholder="Email" 
                prefix={<MailOutlined />} 
                />

                </Form.Item>
            <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
            >
            <Input.Password 
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
            />
            </Form.Item>
            <Form.Item 
            name="password2"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password 
            size="large" 
            placeholder="Confirm Password" 
            prefix={<LockOutlined />} 
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item {...tailLayout} className='mt-6'>
              <Button type="primary" size="large" htmlType="submit" className='mr-4' loading={isLoading}>
                Register
              </Button>
              <Text strong>Already have an Account? <Link to="/login">Login</Link></Text>
          </Form.Item>
        </Form>
        <Paragraph>
            By signin up, you agree to our <Link to="#">Terms and Conditions</Link> & <Link to="#">Privacy Policy</Link>
        </Paragraph>
      </div>
    </AuthLayout>
  )
}

