import React, { useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import { faqList } from '../utils/faq';

export const Faq = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <NavigationBar
        isAuthenticated={isAuthenticated}
      />
      <Container fluid >
        <Row className="full-height-row overflow-x-auto">
          <Col sm={12} md={10} className='mx-auto my-4'>
            <h3 className="text-center fs-1 mb-3 text-capitalize">Frequently Asked Questions</h3>
            <Accordion>
              {
                faqList.map((data, index) => {
                  return (
                    <Accordion.Item key={index} eventKey={index}>
                      <Accordion.Header>{data.title}</Accordion.Header>
                      <Accordion.Body>{data.body}</Accordion.Body>
                    </Accordion.Item>
                  )
                })
              }
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  )
}
