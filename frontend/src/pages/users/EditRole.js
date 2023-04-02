import React, { useState } from 'react'
import { useNavigate, useParams  } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Form, Button, Typography, notification, Select, Spin  } from 'antd';
import { updateRole } from '../../services/userServices';
const { Title  } = Typography;



export default function EditRole() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    const onFinish = async(values) => {

        setIsLoading(true);

        const {role } = values

        //validation
        if(!role){
          return notification.error({
            message: 'Validation Faild',
            description:
              'All fields are required',
          });
        }

        const formData = {
            role
        }

        try {
            const data = await updateRole(formData, id); 
            notification.success({
                message: 'User role updated'
            });
            navigate('/users/add-role');
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            notification.error(error.message);
        }

    };

    return (
        <Layout>
            <div className="space-align-block">
                <Title level={2} className='mb-6'>Edit User Role</Title>
                <Form name="auth" className='mb-12' size="large" onFinish={onFinish} 
                style={{
                    maxWidth: 600,
                }}
                >
                <Spin spinning={isLoading}>
                        <Form.Item
                        name="role"
                        rules={[{ required: true, message: 'Please select role' }]}
                        label="User Roles"
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
                                    value: 'user',
                                    label: 'User',
                                },
                                {
                                    value: 'admin',
                                    label: 'Admin',
                                },
                                {
                                    value: 'superadmin',
                                    label: 'Super Admin',
                                }
                                ]}
                            />
                        </Form.Item>

                        <Form.Item className='mt-6'>
                            <Button type="primary" size="large" htmlType="submit" className='mr-4'>
                                Update Role
                            </Button>
                        </Form.Item>
                    </Spin>
                </Form>
            </div>
        </Layout>
    );
};