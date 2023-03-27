import React from 'react'

import { Col, Row} from 'antd';

export default function Card({ children, cardClass}) {
  return (
    <Row justify="space-around" align="middle" className='min-h-screen min-h-auto-md' >
        <Col md={22} xl={11}>
            <div className="space-align-container p-4-md">
                {children}
            </div>
        </Col>    
    </Row>
  )
}
