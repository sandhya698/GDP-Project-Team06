import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { dashboardList } from '../../utils/dashboardIconList';

export const MiscStatsCard = ({miscStats}) => {

  return (
    <>
      {
        Object.keys(miscStats).map((data, index) => ( 
          <Col key={index} >
            <Card bg={dashboardList[index].bgColor} style={{height: "120px"}} className='flex-row align-items-center justify-content-around shadow'>
              <Col sm={8} md={8}>
                <Card.Body className='py-2'>
                  <Card.Title className="text-white fs-5">{dashboardList[index].name}</Card.Title>
                  <Card.Text>
                    <span className='fw-boldler fs-3 text-white'>{miscStats[data]}</span>
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col md={4}>
              <i className={`${dashboardList[index].icon} text-white fs-1 }`}></i>
              </Col>
            </Card>
          </Col>
          )
        )
      }
    </>
  )
}
