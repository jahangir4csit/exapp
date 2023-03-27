import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {Col, Row, Input, Form, Checkbox, Button, Typography, notification} from 'antd';
import {UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined  } from '@ant-design/icons'
import AuthLayout from '../../components/layout/AuthLayout';
import {loginUserApiRequest, validateEmail} from "../../services/authServices";
import {SET_LOGIN, SET_NAME} from "../../redux/features/auth/authSlice";
import {useDispatch} from "react-redux";

const { Paragraph, Title  } = Typography;
const tailLayout = {
    wrapperCol: {
      span: 16,
    },
  };

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async(values) => {
        const {email, password } = values;
        if(!email || !password){
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
            email, password
        }
        setIsLoading(true);
        try {
            const data = await loginUserApiRequest(userData)
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

  return (
    <AuthLayout>
        <div className="space-align-block">
            <Title level={2} className='mb-6'>Sign In</Title>
            <Form name="auth" className='mb-12' onFinish={onFinish}>
                <Form.Item 
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input size="large" placeholder="Email" prefix={<UserOutlined />} />

                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                <Input.Password size="large"
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                </Form.Item>
                <Form.Item className='mb-6'>
                    <Row justify="space-between" align="middle">
                        <Col><Checkbox>Remember me</Checkbox></Col>
                        <Col><Link to="/forgot">Forgot Password?</Link></Col>
                    </Row>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" size="large" htmlType="submit" className='mr-4' loading={isLoading}>
                        Login
                    </Button>
                    <Button size="large" htmlType="button" href='/registration' >
                        Register
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
