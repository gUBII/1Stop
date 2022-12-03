import React from 'react'
import {Outlet} from "react-router-dom"
import logo from '../OneStopLogo.png'; 
import {Nav, Navbar, Container}  from 'react-bootstrap'



const AdminPage = () => {

  return (
    <Container fluid>
    <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand className='d-flex' href="/admin">
        <embed
          alt="1Stop"
          src={logo}
          width="125"
          height="50"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/admin/products">Products</Nav.Link>
            <Nav.Link href="/admin/orders">Orders</Nav.Link>
        </Nav>
    </Container>
  </Navbar>
  <Outlet />
</Container>
  )
}

export default AdminPage