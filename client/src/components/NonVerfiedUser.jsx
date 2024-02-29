import React from 'react'

export const NonVerfiedUser = ({status}) => {
  return (
    <>
        <p>Your status is not verified.</p>
        <p>Current status is <strong className='text-danger'>{status}</strong>.</p>
        <p>Contact your admin to get yourselves verified.</p>
    </>
  )
}
