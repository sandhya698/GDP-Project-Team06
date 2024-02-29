import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import bloodImage from '../../assets/oBlood.png'

export const PatientDashboard = () => {
  return (
    <>
      <Row className='patient-dash h-100' >
        <Col md={8}>
        <div className='h-75 img-container text-center patient-img'>
          <Image src={bloodImage} />
          <div class='text-on-image'>
            <p className='m-0'><span className='unit-count'>06</span>Units<br /> Transfused</p>
          </div>
        </div>
        <div className='h-auto text-center fs-2'><span className='fw-bold text-danger'>6</span> requests are yet to confirm</div>
        <div className='h-auto text-center text-capitalize fw-bold fs-1 text-danger'>we hope for your safer health</div>
        </Col>
        <Col md={4}>
          <h3>Recently donated persons....</h3>
          <br />
          <p className='fs-4'>mark</p>
          <p className='fs-4'>anthony</p>
          <p className='fs-4'>jack</p>
          <p className='fs-4'>Ceaser</p>
          <p className='fs-4'>Hunter</p>
        </Col>
          
      </Row>
    </>
  )
}
