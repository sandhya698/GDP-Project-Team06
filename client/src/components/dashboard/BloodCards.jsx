import React from 'react'
import { Card, Col } from 'react-bootstrap'

export const BloodCards = ({stock}) => {
  return (
    <>
      {
        stock.map((data, index) => (
          <Col key={index}>
            <Card border='primary' className='flex-row align-items-center justify-content-around shadow' style={{ height: "120px"}}>
              <Col sm={8} md={8}>
                <Card.Body className='py-2'>
                  <Card.Title className="text-primary fs-1">{data.bloodGroup}</Card.Title>
                  <Card.Text>
                    <span className='fw-boldler fs-5'>{data.quantity}ml</span> Available
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col md={4}>
                <i className="fas fa-tint" style={{ color: "red", fontSize: "2.8rem"}}></i>
              </Col>
            </Card>
          </Col>
          )
        )
      }
    </>
  )
}
