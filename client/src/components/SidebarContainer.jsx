import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Sidebar } from './Sidebar'

export default function SidebarContainer({children}) {
  return (
    <>
      <Container fluid> 
        <Row className="h-100"> 
          <Sidebar />
          <Col className='p-0'>
            <Container className='px-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
              {children} 
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}
