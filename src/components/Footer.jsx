import React from 'react'
import logo from '../OneStopLogo.png'

const Footer = () => {
  return (
    <div className='d-flex justify-content-end align-items-center py-4 fixed-bottom'
          style={{'backgroundColor': '#e3f2fd'}}
    >
        Powered by
        <embed
        alt="1Stop"
        src={logo}
        width="120"
        height="50"
        className="d-inline-block mx-2"
    />
  </div>
  )
}

export default Footer