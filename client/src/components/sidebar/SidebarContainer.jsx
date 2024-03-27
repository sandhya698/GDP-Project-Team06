import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Sidebar } from './Sidebar'
import { useLocation } from 'react-router-dom';


export default function SidebarContainer({ children }) {
  const NON_SIDEBAR_ROUTES = ['/login', '/about','/register','/faq', '/'];
  
  const location = useLocation();
  // console.log(location.pathname)


  return (
    <>
      {
        !NON_SIDEBAR_ROUTES.includes(location.pathname)?
        (
          <Container fluid> 
            <Row className="h-100"> 
              <Sidebar/>
              <Col className='p-0 ms-5 m-sm-auto'>
                <Container className='' style={{ height: '100vh', overflowY: 'auto' }} >
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
