import React from 'react'
import { Col, Row, Typography  } from 'antd';
import Card from '../../components/card/Card';

const { Paragraph, Title  } = Typography;

export default function AuthLayout({children}) {
  return (
    <div className='login_page bg-theme'>
    <Row justify="center" align="middle" className='min-h-screen'>
        <Col span={12} className='hidden-md bg-theme'>
            <Row justify="space-around" align="middle" className='min-h-screen' >
                <Col span="12">
                    <Title level={1} className='text-white'>
                    Express app
                    </Title>
                    <Paragraph className=' text-white opacity-7 text-md'>
                    Manage products in the werehouse in the real time and 
                    integrated to make it easier to develop your business. 
                    </Paragraph>
                </Col>
            </Row>
        </Col>
        <Col span={12} className='min-h-screen bg-white min-h-auto-md rounded-lg-md'>
            <Card>
                {children}
            </Card>
        </Col>
    </Row>
</div>
  )
}
