import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const MyCard = ({ count, height, rowCount }) => {
  
  const CustomCard = () => {
    return (
      <Card border='primary' className='flex-row align-items-center justify-content-around shadow' style={{ height }}>
        {/* <Row> */}
          <Col md={8}>
            <Card.Body className='py-2'>
              <Card.Title className="text-primary fs-1">A+</Card.Title>
              <Card.Text>
                <span className='fw-boldler fs-5'>8ml</span> Available
              </Card.Text>
            </Card.Body>
          </Col>
          <Col md={4}>
            <Icon>
              <i className="fas fa-tint"></i>
            </Icon>
          </Col>
        {/* </Row> */}
      </Card>
    );
  }

  return (
    <>
      <Row xs={1} md={rowCount} className="g-4 mt-0">
        {Array.from({ length: count }).map((_, idx) => (
          <Col key={idx}>
            <CustomCard />
          </Col>
        ))}
      </Row>
    </>
  );
};

const Icon = styled.div`
  color: red;
  font-size: 4rem;
`

export default MyCard;