import React from 'react'
import {Container} from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const HomePage = () => {

  return (
      <Container fluid 
        style={{'backgroundColor': '#e3f2fd'}}>
          <NavBar/>
        <Outlet/>
        <Footer/>
      </Container>

  )
}

export default HomePage