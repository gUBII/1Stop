import React from "react";
import {Link} from "react-router-dom"
import SearchBar from "./SearchBar";
import { useCart } from "../hooks/useCart";
import {Button,Container, Nav, Navbar, Row, Col} from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/login";
import LogoutButton from "../auth/logout";

const NavBar = () => {
  const {handleShowCart, totalItems} = useCart();
  const { user, isAuthenticated} = useAuth0();

  return (
    <>
    <Navbar style={{'backgroundColor': '#e3f2fd'}} 
            variant="light" 
            expand="lg"
            className='mb-2'>
      <Container fluid>
      <Row className='w-100 d-flex flex-row'>
        <Col className="d-flex flex-row justify-content-center">
        <Link to="/" style={{'textDecoration': 'none'}}>
          <Navbar.Brand 
            style={{'fontFamily':'Lucida Handwriting, Helvetica, sans-serif'}}
            className='fw-semibold fs-3 '>
              HandMade Crafts
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="my-2 my-lg-0">
            <Nav.Link href="/">Products</Nav.Link>
          </Nav>
          </Col>
          <Col className="d-flex flex-row justify-content-center">
          <SearchBar/>
          </Col>
          <Col className="d-flex flex-row justify-content-end">
          <div className="justify-content-end px-3">
            <Button style={{width:"3em", height:"3em", position: "relative"}} 
                    onClick = {handleShowCart}
                    variant="light outline-primary"
                    className="rounded-circle me-2"
                    >
              <FaShoppingCart style={{width:"2em", height:"2em", transform:"translate(-18%,0)"}}
                              />
              {totalItems > 0 && 
                    <div className ="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                          style={{width:"1.5em", height:"1.5em", color:"white", position: "absolute", bottom: 0, right: 0, transform:"translate(25%,25%)"}}
                          >
                    {totalItems}</div>}
            </Button>
          </div>
          {isAuthenticated? <LogoutButton/> : <LoginButton/>}
          </Col>
          </Row>
      </Container>
    </Navbar>
    </>  
  );
};

export default NavBar;
