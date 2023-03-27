import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Input, Form, Button, Typography, notification  } from 'antd';
import {EyeTwoTone, EyeInvisibleOutlined, LockOutlined  } from '@ant-design/icons'
import AuthLayout from '../../components/layout/AuthLayout';
import { resetPasswordApiRequest } from '../../services/authServices';



const { Paragraph, Title  } = Typography;
const tailLayout = {
    wrapperCol: {
      span: 20,
    },
  };

export default function Reset() {

  const {resetToken} = useParams();

  const onFinish = async(values) => {
    const {password, password2  } = values;
    console.log(password, password2, resetToken);

    if(!password || !password2){
        return notification.error({
            message: 'Validation Faild',
            description:
                'All fields are required',
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
        password, password2
    }

    try {
        const data = await resetPasswordApiRequest(userData, resetToken);
        console.log(data);
        if(data.statusText === 'OK'){
          notification.success({
            message: data.data.message,
          });
        }else{
          notification.error({
            message: data.message,
          });
        }

    } catch (error) {  
      notification.error({
        message: error.message
      });
    }
}

  return (
    <AuthLayout>
      <div className="space-align-block">
          <Title level={2} className='mb-6'>Reset Password</Title>
          <Form name="auth" className='mb-12' onFinish={onFinish}>
              <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input new Password!' }]}
              >
              <Input.Password size="large"
                  placeholder="New Password"
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
                  message: 'Please input confirm new password!',
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
              <Input.Password size="large" 
              placeholder="Confirm New Password" 
              prefix={<LockOutlined />} 
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item {...tailLayout} className='mt-6'>
                <Button type="primary" size="large" htmlType="submit" className='mr-4'>
                  Reset Password
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

