import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Sidebar } from './Sidebar'
import { useLocation } from 'react-router-dom';
import { Profile } from '../profile/Profile';


export default function SidebarContainer({ children }) {
  const NON_SIDEBAR_ROUTES = ['/login', '/about','/register','/faq', '/'];
  
  const location = useLocation();
  // console.log(location.pathname)

  const [show, setShow] = useState(false);

  const handleUserProfileClick = (event) => {
    event.preventDefault();
    console.log('user profile clicked');
    setShow(true);
  }

  return (
    <>
      {
        !NON_SIDEBAR_ROUTES.includes(location.pathname)?
        (
          <Container fluid> 
            <Row className="h-100"> 
              <Sidebar handleUserProfileClick={handleUserProfileClick} />
              <Col className='p-0 ms-5 m-sm-auto'>
                <Container className='' style={{ height: '100vh', overflowY: 'auto' }} >
                    {children} 
                    <Profile show={show} setShow={(data) => setShow(data)} />
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
