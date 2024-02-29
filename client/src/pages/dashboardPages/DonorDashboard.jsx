import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import bloodImage from '../../assets/oBlood.png'

export const DonorDashboard = () => {
  return (
    <>
      <Row className='donor-dash h-100' >
        <Row>
          <div className='fs-2 fw-bold text-center text-capitalize'>you may have have saved <span className='text-danger'>N</span> lives</div>
        </Row>
        <Row>
          <Col md={6}>
            <Row className='align-items-center gap-2'>
              <Col md={{ span: 6, offset: 3 }} className=' text-center bg-white '>
                <div>
                  <span className='text-success' style={{fontSize: '5rem'}}>00/99</span><br />
                  <span className='fs-3 fw-semibold'>Accepted</span>
                </div>
              </Col>
              <Col className=' text-center  bg-white '>
                <div>
                  <span className='text-warning' style={{fontSize: '5rem'}}>00/99</span><br />
                  <span className='fs-3 fw-semibold'>Pending</span>
                </div>
              </Col>
              <Col className=' text-center  bg-white '>
                <div>
                  <span className='text-secondary' style={{fontSize: '5rem'}}>00/99</span><br />
                  <span className='fs-3 fw-semibold'>Rejected</span>
                </div>
              </Col>
            </Row>
          </Col> 
          <Col md={6}>
            <Image src={bloodImage} />
          </Col>
        </Row>
        <Row>
          <div className='text-capitalize fs-2 fw- text-center text-danger'>thank you for your kind gesture</div>
        </Row>
      </Row>
    </>
  )
}