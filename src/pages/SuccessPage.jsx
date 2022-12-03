import React from 'react'
import {FaRegCheckCircle} from 'react-icons/fa'

const SuccessPage = () => {
  return (
    <div className='d-flex flex-column justify-content-center pt-5'>
        <FaRegCheckCircle className = 'mx-auto'style={{ color: "#64C16B", fontSize: "6em" }}/>
        <h1 className = 'mx-auto py-3'>Thank you</h1>
        <h2 className = 'mx-auto'>Your order was completed successfully</h2>
    </div>
   
  )
}

export default SuccessPage