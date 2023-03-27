import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Col, Row, Divider, Space, Typography, Input, Form, Checkbox, Button  } from 'antd';
import {DingtalkOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined  } from '@ant-design/icons'
import LoginBanner from '../../assets/img/log-illustration.svg';

const { Paragraph, Title  } = Typography;

export default function Home() {
    const tailLayout = {
        wrapperCol: {
          span: 16,
        },
      };
      const StyledForm = styled(Form)`
      .ant-form-item {
        margin-bottom: 12px;
      }
    `;

    const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <div className='login_page bg-theme'>
        <Row justify="center" align="middle" className='min-h-screen'>
            <Col span={12} className='hidden-md bg-theme'>
                <Row justify="space-around" align="middle" className='min-h-screen' >
                    <Col span="12">
                        <img className='my-4' src={LoginBanner} alt='login banner' />
                        <Title level={1} className='text-white'>
                        Inventory and Stock Management Solution
                        </Title>
                        <Paragraph className=' text-white opacity-7 text-md'>
                        Inventory system to contol and manage products in the werehouse 
                        in the real time and integrated to make it easier to develop your business. 
                        </Paragraph>
                    </Col>
                </Row>

                {/* <Row justify="space-between">
                    <Col flex="100px" className='logo'>
                        <DingtalkOutlined />
                    </Col>
                    <Col flex="auto" align>
                        <Space split={<Divider type="vertical" />} className="auth_link">
                            <Typography.Link href='/register'>Register</Typography.Link>
                            <Typography.Link href='/login'>Login</Typography.Link>
                        </Space>
                    </Col>
                </Row> */}
            </Col>
            <Col span={12} className='min-h-screen bg-white min-h-auto-md rounded-lg-md'>
                <Row justify="space-around" align="middle" className='min-h-screen min-h-auto-md' >
                    <Col md={22} xl={11}>
                        <div className="space-align-container p-4-md">
                            <div className="space-align-block">
                                <Title level={2} className='mb-6'>Sign In</Title>
                                <StyledForm name="auth" className='mb-12'>
                                    <Form.Item 
                                        name="email"
                                        rules={[
                                        {
                                            required: true,
                                        },
                                        ]}
                                    >
                                        <Input size="large" placeholder="Email" prefix={<UserOutlined />} />

                                        </Form.Item>
                                        <Form.Item
                                        name="password"
                                        rules={[
                                        {
                                            required: true,
                                        },
                                        ]}
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
                                            <Col><Link to="#">Forgot Password?</Link></Col>
                                        </Row>
                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" size="large" htmlType="submit" className='mr-4'>
                                            Login
                                        </Button>
                                        <Button size="large" htmlType="button">
                                            Register
                                        </Button>
                                    </Form.Item>
                                </StyledForm>
                                <Paragraph>
                                    By signin up, you agree to our <Link to="#">Terms and Conditions</Link> & <Link to="#">Privacy Policy</Link>
                                </Paragraph>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}
