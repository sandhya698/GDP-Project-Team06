import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const MyCard = ({count}) => {
  return (
    <>
      <Row xs={1} md={4} className="g-4 mt-0">
      {Array.from({ length: count }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default MyCard;