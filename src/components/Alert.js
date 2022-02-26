import React from 'react'

const Alert = (props) => {
  return (
    <div className='alert alert-primary mt-4' role='alert'>
        {props.message}
    </div>
  )
}

export default Alert
