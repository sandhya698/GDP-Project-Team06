import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Sidebar } from './Sidebar'
import { useLocation } from 'react-router-dom';


export default function SidebarContainer({ children }) {
  const SIDEBAR_ROUTES = ['/dashboard', '/donors', '/patients', '/donations', '/requests', '/inventory', '/donate', '/request'];
  
  const location = useLocation();
  console.log(location.pathname)

  return (
    <>
      {
        SIDEBAR_ROUTES.includes(location.pathname)?
        (
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
        ) : 
        (
          <>
            {children} 
          </>
        )
      }
    </>
  )
}
